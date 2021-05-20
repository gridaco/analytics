import Axios from "axios";
import { totp } from "otplib";

const PROXY_ANALYTICS_BASE_URL = "https://analytics.internal.bridged.cc";

/**
 * [GLOBAL] global variable for saving totp secret for authenticating anonymous user and allowing only first party bridged apps to access the analytics api.
 * for opensource development perpose, you may use the default secret value "00000000"
 */
let _TOTP_AUTHENTICATION_SECRET: string;

/**
 * CORS proxy host for this proxy analytics request. since the proxy analytics is mostly used by embedded platforms, we are providing cors option in the box.
 */
let _PROXY_CORS_PROXY_HOST: string;

export function initTotpSecret(secret: string) {
  _TOTP_AUTHENTICATION_SECRET = secret;
}

export function initCors(host?: string) {
  const _host = host ?? "https://cors.bridged.cc";
  _PROXY_CORS_PROXY_HOST = _host;
}

export async function event(
  params: {
    secret?: string;
    app: string;
    event: {
      name: string;
      params?: object;
    };
  },
  options?: {
    useenv?: boolean;
    warn?: boolean;
  }
) {
  const { app, event, secret: __secret } = params;

  /**
   * once the secret is provided by init function, ignore the param from this function. use the global secret instead.
   */
  const secret = _TOTP_AUTHENTICATION_SECRET ?? __secret;

  /**
   * creates token with optional useenv option.
   * @returns
   */
  const _makeToken = (): string => {
    if (secret === undefined && options?.useenv === true) {
      return makeValidationToken(
        process.env.BRIDGED_FIRST_PARTY_ANALYTICS_PROXY_SERVICE_TOTP_SECRET
      );
    } else {
      return makeValidationToken(secret);
    }
  };

  try {
    const _token = _makeToken();

    // build url with cors
    const _url =
      `${
        _PROXY_CORS_PROXY_HOST ? _PROXY_CORS_PROXY_HOST : ""
      }${PROXY_ANALYTICS_BASE_URL}` + "/analytics/event";

    const _ev_res = await Axios.post(
      _url,
      {
        app: app,
        name: event.name,
        params: event.params,
      },
      {
        params: {
          token: _token,
        },

        // cors header setting https://github.com/bridgedxyz/base/issues/21
        headers: _PROXY_CORS_PROXY_HOST && {
          origin: `https://${app}.bridged.xyz`,
        },
      }
    );

    return _ev_res.data;
  } catch (_) {
    if (options?.warn !== false) {
      console.warn(
        "[IGNORE] non critical error occured while performing analytics event emition. you can silent this warning by setting `warning: false`",
        _
      );
    }
    // may be unauthorized. ignore this. (it's also being used on opensource instance. can be ignored)
    // on opensource instance caller the token will mismatch.
  }
}

function makeValidationToken(secret: string) {
  if (secret === undefined) {
    throw "secret is empty. cannot crete token for anonymous proxy validation.";
  }
  return totp.generate(secret);
}

import { ga4 } from "..";

export interface GA4EventResult {
  ok: boolean;
  error?: string;
}

/**
 * **!!!WARNING!!!** - using this on browser WILL expose your api secret.
 * GA4 was designed for usage on serverside, calling this will expose your api_secret since GA4 forces us to put api_secret in the url query param `api_secret`
 * @param ev
 * @param options
 * @returns
 */
export async function event(
  ev: ga4.GA4EventRequest,
  options?: {
    dubug?: boolean;
  }
): Promise<GA4EventResult> {
  const _isdebug = options?.dubug === true;

  const _requestBaseUrl = _isdebug
    ? "https://www.google-analytics.com/debug/mp/collect"
    : "https://www.google-analytics.com/mp/collect";
  try {
    const _reqres = await fetch(
      `${_requestBaseUrl}?measurement_id=${ev.measurement_id}&api_secret=${ev.api_secret}`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: "XXXXXXXXXX.YYYYYYYYYY",
          events: [
            {
              // Event names must start with an alphabetic character.
              name: "_badEventName",
              params: {},
            },
          ],
        }),
      }
    );
    if (_reqres.status >= 200 && _reqres.status < 300) {
      return <GA4EventResult>{
        ok: true,
      };
    } else {
      return <GA4EventResult>{
        ok: false,
      };
    }
  } catch (e) {
    return <GA4EventResult>{
      ok: false,
      error: e?.message ?? "unknown error",
    };
  }
}

import * as proxy from "../../proxy";

/**
 * app name used for analytics. do not modify. learn more at https://github.com/bridgedxyz/analytics
 */
const __APP = "assistant";

/**
 * inits the proxy analytics with totp secret
 * @param secret
 */
export function initWithProxy(secret: string) {
  proxy.initTotpSecret(secret);
}

/**
 * enables cors proxy also.
 */
export function initWithCors() {
  proxy.initCors();
}

/**
 * creates an event data. not emmiting one, only forming the data.
 */
export function eventData<T = any>(
  name: string,
  params: { [key: string]: string }
): T {
  return {
    name: name,
    params: params as object,
  } as any as T;
}

/**
 * emmits assistant event
 * @param event
 * @returns
 */
export async function event(event: {
  name: string;
  params?: { [key: string]: string };
}) {
  return await proxy.event({
    app: __APP,
    event: event,
  });
}

export * from "./events";

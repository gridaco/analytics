/**
 * All acceptable bridged analytics events
 */
export type TBridgedAnalyticsEvents = Signin | Signup;

/**
 * season1, version0 of bridged accounts events namespace
 */
const __ACCOUNTS_NAMESPACE = "s1v0-accounts.bridged.xyz";

/**
 * event data when user signup is complete
 */
export interface Signup {
  namespace: typeof __ACCOUNTS_NAMESPACE;
  event: "signup";
  host: string;
  proxied: boolean;
}

/**
 * event data when user signin is complete (a.k.a "login")
 */
export interface Signin {
  namespace: typeof __ACCOUNTS_NAMESPACE;
  event: "signin";
}

export interface GA4Event {
  name: string;
  params?: object | {};
}

/**
 * GA4 Event Request interface
 * reference: https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=firebase
 */
export interface GA4EventRequest {
  api_secret: string;
  measurement_id: string;
  client_id: string;
  events: GA4Event[];
}

/**
 * @deprecated - firebase ga4 protocol is not fully provided by google. meanwhile, we are leaving this empty.
 * Take a look at issue: https://github.com/bridgedxyz/assistant/issues/74 for more details.
 */
export interface FirebaseGA4EventRequest {}

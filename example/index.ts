import { ga4 } from "@analytics.bridged.xyz/google-analytics-component";

const measurement_id = `G-XXXXXXXXXX`;
const api_secret = `<secret_value>`;

fetch(
  `https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
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

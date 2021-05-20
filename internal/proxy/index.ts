import Axios from "axios";
const PROXY_ANALYTICS_BASE_URL =
  "https://https://analytics.internal.bridged.cc";

const axios = Axios.create({
  baseURL: PROXY_ANALYTICS_BASE_URL,
});

function event(
  params: {
    token?: string;
    app: string;
    event: {
      name: string;
      params: object;
    };
  },
  options?: {
    useenv?: boolean;
  }
) {
  const { token } = params;
  try {
    axios.post(
      "/analytics/event",
      {
        app: "assistant",
        name: "page_view",
        params: {
          page_path: "/",
          page_title: "assisant",
        },
      },
      {
        params: {
          token: token,
        },
      }
    );
  } catch (_) {
    // may be unauthorized. ignore this. (it's also being used on opensource instance. can be ignored)
    // on opensource instance caller the token will mismatch.
  }
}

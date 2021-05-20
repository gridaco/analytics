import { totp } from "otplib";
import { ga4 } from "@analytics.bridged.xyz/google-analytics-component";
import serverless from "serverless-http";
import express, { Request, Response } from "express";
import { nanoid } from "nanoid";
import bodyParser from "body-parser";

const TOTP_SECRET =
  process.env.BRIDGED_FIRST_PARTY_ANALYTICS_PROXY_SERVICE_TOTP_SECRET;

const app = express();
const devApp = express.Router();
const analyticsApp = express.Router();

const DEVELOPMENT_GUARD = function (req, res, next) {
  if (process.env.NODE_ENV == "development") {
    next();
  } else {
    res.status(404);
  }
};
const TOTP_GUARD = function (req, res, next) {
  const _reqtoken: string = req.query.token as string;
  const valid = totp.verify({
    token: _reqtoken,
    secret: TOTP_SECRET,
  });

  if (valid) {
    next();
  } else {
    res.status(401).send();
  }
};

function loagGa4ApiSecret(app: string): string {
  return process.env[`GA4_API_SECRET_STREAM_${app?.toUpperCase()}`];
}
function loadGa4MeasurementId(app: string): string {
  return process.env[`GA4_MEASUREMENT_ID_${app?.toUpperCase()}`];
}

/**
 * OTP Middleware - prevent anonymous app from calling the api
 */
analyticsApp.use(TOTP_GUARD);
devApp.use(DEVELOPMENT_GUARD);
app.use(bodyParser.json());
app.use("/analytics", analyticsApp);
app.use("/development", devApp);

app.get("/status", (req: Request, res: Response) => {
  res.send({ message: "Server is running" });
});

analyticsApp.post("/event", async (req: Request, res: Response) => {
  const data = req.body as {
    app: string;
    name: string;
    client_id?: string;
    params?: {} | object;
  };

  const _api_secret = loagGa4ApiSecret(data.app);
  const _measurement_id = loadGa4MeasurementId(data.app);
  const _evRes = await ga4.event({
    api_secret: _api_secret,
    measurement_id: _measurement_id,
    client_id: data.client_id ?? nanoid(),
    events: [
      {
        name: data.name,
        params: data.params ?? {},
      },
    ],
  });

  if (_evRes.ok) {
    res.status(202).send();
  } else {
    res.status(400).send(_evRes.error);
  }
});

analyticsApp.get("/status", (req, res) => {
  res.send({ message: "Your app is valid to use analytics proxy api" });
});

devApp.get("/test-token", (req, res) => {
  const token = totp.generate(TOTP_SECRET);
  res.send({
    dev_token: token,
  });
});

export const handle = serverless(app);

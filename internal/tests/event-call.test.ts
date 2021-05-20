///
/// The test WILL Fail unless you issue your own permited secret key from bridged administor.
/// This test is not designed for running as CI test.
/// since it loads env var, run the test under "this" directory.
/// e.g `cd tests && ts-node event-call.test.ts`
///

import { event, initCors } from "../lib/proxy";
import { config } from "dotenv";
config({
  // you'll need to set your own env
  path: ".env.test",
});

const secret = process.env.PROXY_SECRET;

initCors();
event({
  app: "assistant",
  event: {
    name: "test_hit",
  },
  secret: secret,
})
  .then((d) => {
    console.log(d);
  })
  .catch((e) => {
    console.error(e);
  });

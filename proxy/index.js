const express = require("express");
const proxy = require("express-http-proxy");
const hmac256 = require("crypto-js/hmac-sha256");
const base64 = require("crypto-js/enc-base64");
const fs = require("fs");

const app = express();

const credentialsFils = "./credentials.json";
const appFolder = "../app/dist/";

let url = process.env.URL;
let apiKey = process.env.API_KEY;
let apiSecret = process.env.API_SECRET;

if (fs.existsSync(credentialsFils)) {
  const credentials = JSON.parse(fs.readFileSync(credentialsFils).toString());
  url = credentials.url;
  apiKey = credentials.apiKey;
  apiSecret = credentials.apiSecret;
}

// ---- API Routing and HMAC Auth ---- //
app.all(
  "/api/*",
  proxy(url, {
    proxyReqOptDecorator: (reqOpt, srcReq) => {
      if (srcReq.originalUrl.startsWith("/api/external")) {
        const signature = signRequest(srcReq, apiSecret);
        reqOpt.headers["Authorization"] = `HMAC ${apiKey}:${signature}`;
      }
      return reqOpt;
    },
  })
);

// ---- SERVE STATIC FILES ---- //
app.get("*.*", express.static(appFolder, { maxAge: "1y" }));

// ---- APPLICATION PATHS ---- //
app.all("/*", (req, res) => {
  res.status(200).sendFile(`/`, { root: appFolder });
});

app.listen(4000, () => console.log("Listeing on *:4000"));

function signRequest(req, secret) {
  const contentLength = req.headers["content-length"] || "0";
  return generateSignature(contentLength, req.method, req.originalUrl, secret);
}

function generateSignature(contentLength, method, path, secret) {
  const msg = `${contentLength || 0}${method}${path
    .replace("?", "")
    .toLowerCase()}`;

  return base64.stringify(hmac256(msg, secret));
}

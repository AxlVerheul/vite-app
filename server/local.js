import http from "http";
import handler from "./api.js";

const server = http.createServer((req, res) => {
  // Forward the request to the serverless handler
  handler(req, res);
});

server.listen(3000, () => {
  console.log("Local API running at http://localhost:3000");
});

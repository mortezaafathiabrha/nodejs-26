import { createServer } from "node:http";
import { node26Report } from "./scripts/assert-node26.mjs";

const report = node26Report();
const visits = new Map();
const port = Number(process.env.PORT ?? 3000);

const server = createServer((request, response) => {
  const path = request.url ?? "/";
  const count = visits.getOrInsert(path, 0) + 1;
  visits.set(path, count);

  const body = [
    "Hello World!",
    `Node.js ${report.node}`,
    `Started ${report.startedAt}`,
    `Requests for ${path}: ${count}`,
    "",
  ].join("\n");

  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(body);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

import app from "./app.ts";

const servehandler = (req: Request) => {
  return app.fetch(req);
};

console.log(`🐇 Server is running at http://localhost:4000`);
Bun.serve({
  port: 4000,
  fetch: servehandler,
});
// import app from "./app.ts";

// const servehandler = (req: Request) => {
//   return app.fetch(req);
// };

// console.log(`🦕 Server is running at http://localhost:4000`);
// Deno.serve({ port: 4000 }, servehandler);

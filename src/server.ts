import { app } from "./app";

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:3000/`)
);

process.on("SIGINT", () => {
  server.close();
  console.log("🎃 Server closed !! \n");
});

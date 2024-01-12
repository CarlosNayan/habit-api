import cors from "@fastify/cors";
import fastify from "fastify";
import { Routes } from "./routes";

const app = fastify();

app.register(cors);
app.register(Routes);

app.listen({ port: 3333, host: "10.0.0.181"}).then(() => {
  console.log("Rodando em localhost:3333 🚀");
});

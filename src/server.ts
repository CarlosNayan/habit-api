import { PrismaClient } from "@prisma/client";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors"

const app = fastify();
const prisma = new PrismaClient();

app.register(cors)

app.get("/", async (req: FastifyRequest, res: FastifyReply) => {
  const habits = await prisma.habits.findMany();

  return res.status(200).send(habits);
});

app.listen({ port: 3333 }).then(() => {
  console.log("Rodando em localhost:3333 🚀");
});

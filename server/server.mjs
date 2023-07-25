import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifyMultipart from "@fastify/multipart";
import path from "path";
import { fileURLToPath } from "url";
import questions from "./questions.mjs";
import checkAnswers from "./checkAnswers.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify();

server.register(cors, {});
server.register(fastifyMultipart, { addToBody: true });
server.register(fastifyStatic, {
  root: path.join(__dirname, "../client"),
});

server.get("/questions", (request, reply) => {
  return reply.send(questions);
});

server.post("/answers", (request, reply) => {
  return checkAnswers(questions, request.body);
});

server
  .listen({ port: 7777 })
  .then(() => {
    console.log("Server is running");
  })
  .catch((error) => {
    console.error(error);
  });

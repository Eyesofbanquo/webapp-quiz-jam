import { Router } from "express";

export const difficultyRouter = Router();

difficultyRouter.get("/difficulty", (request, response) => {
  response.send({ success: true, data: ["easy", "normal", "hard"] });
});

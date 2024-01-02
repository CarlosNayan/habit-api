import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { Repository } from "./repository";

const repository = new Repository();

export class Controller {
  async listAllHabits(req: FastifyRequest, res: FastifyReply) {
    try {
      const habits = await repository.listAllHabits();

      res.status(200).send(habits);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async detailsOfDay(req: FastifyRequest, res: FastifyReply) {
    const detailsOfDayQueryVerify = z.object({
      date: z.coerce.date(),
    });

    const { date } = detailsOfDayQueryVerify.parse(req.query);

    try {
      const specificDay = await repository.detailsOfDay(date);

      res.status(200).send(specificDay);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async createHabit(req: FastifyRequest, res: FastifyReply) {
    const createHabitBodyVerify = z.object({
      title: z.coerce.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBodyVerify.parse(req.body);

    try {
      await repository.createHabit(title, weekDays);

      res.send(200);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

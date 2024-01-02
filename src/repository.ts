import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export class Repository {
  async listAllHabits() {
    return await prisma.habits.findMany();
  }

  async detailsOfDay(date: Date) {
    const week_day = dayjs(date).get("day");

    const possibleHabits = await prisma.habits.findMany({
      where: {
        created_at: {
          lte: date,
        },
        habit_week_days: {
          some: {
            week_day,
          },
        },
      },
    });

    const completedHabits = await prisma.day_habit
      .findFirst({
        where: {
          date: date,
        },
        include: {
          completed_habit: true,
        },
      })
      .then((dayArr) =>
        dayArr?.completed_habit.map((i) => {
          return i.id_habit;
        })
      );

    return { possibleHabits, completedHabits };
  }

  async createHabit(title: string, weekDays: number[]) {
    const today = dayjs().startOf("day").toDate();

    await prisma.habits.create({
      data: {
        title,
        created_at: today,
        habit_week_days: {
          create: weekDays.map((week_day: number) => {
            return { week_day };
          }),
        },
      },
    });
  }
}

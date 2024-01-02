-- CreateTable
CREATE TABLE "habit_week_days" (
    "id_habit_week_days" TEXT NOT NULL PRIMARY KEY,
    "id_habit" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    CONSTRAINT "habit_week_days_id_habit_fkey" FOREIGN KEY ("id_habit") REFERENCES "habits" ("id_habit") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "day_habit" (
    "id_day_habit" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "completed_habit" (
    "id_completed_habit" TEXT NOT NULL PRIMARY KEY,
    "id_habit" TEXT NOT NULL,
    "id_day_habit" TEXT NOT NULL,
    CONSTRAINT "completed_habit_id_habit_fkey" FOREIGN KEY ("id_habit") REFERENCES "habits" ("id_habit") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "completed_habit_id_day_habit_fkey" FOREIGN KEY ("id_day_habit") REFERENCES "day_habit" ("id_day_habit") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "habit_week_days_id_habit_week_day_key" ON "habit_week_days"("id_habit", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "completed_habit_id_habit_id_day_habit_key" ON "completed_habit"("id_habit", "id_day_habit");

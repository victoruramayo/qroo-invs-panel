/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Psychologist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Psychologist_userId_key" ON "Psychologist"("userId");

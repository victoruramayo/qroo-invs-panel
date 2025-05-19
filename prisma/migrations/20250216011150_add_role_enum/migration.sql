-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PSYCHOLOGIST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role";

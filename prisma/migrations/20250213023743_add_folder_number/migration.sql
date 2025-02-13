/*
  Warnings:

  - Added the required column `folderNumber` to the `InvestigationFolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvestigationFolder" ADD COLUMN     "folderNumber" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `folio` to the `InvestigationFolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvestigationFolder" ADD COLUMN     "folio" TEXT NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[folio]` on the table `InvestigationFolder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdByUserId` to the `InvestigationFolder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdateByUserId` to the `InvestigationFolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvestigationFolder" ADD COLUMN     "createdByUserId" TEXT NOT NULL,
ADD COLUMN     "lastUpdateByUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InvestigationFolder_folio_key" ON "InvestigationFolder"("folio");

-- AddForeignKey
ALTER TABLE "InvestigationFolder" ADD CONSTRAINT "InvestigationFolder_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationFolder" ADD CONSTRAINT "InvestigationFolder_lastUpdateByUserId_fkey" FOREIGN KEY ("lastUpdateByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

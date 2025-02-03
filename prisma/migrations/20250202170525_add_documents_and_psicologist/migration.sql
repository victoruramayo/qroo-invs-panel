-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('DICTAMEN', 'INFORME');

-- CreateTable
CREATE TABLE "Psychologist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Psychologist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestigationFolder" (
    "id" BIGSERIAL NOT NULL,
    "victimName" TEXT NOT NULL,
    "requestingMP" TEXT NOT NULL,
    "crime" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "psychologistId" INTEGER NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "deliveredAt" TIMESTAMP(3),
    "document" "DocumentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestigationFolder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvestigationFolder" ADD CONSTRAINT "InvestigationFolder_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "Psychologist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

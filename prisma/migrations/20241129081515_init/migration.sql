/*
  Warnings:

  - You are about to drop the column `createdAt` on the `resUsers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `resUsers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resUsers" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "stockLocation" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "stockLocation_pkey" PRIMARY KEY ("id")
);

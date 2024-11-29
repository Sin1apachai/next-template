/*
  Warnings:

  - You are about to drop the `stockLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "stockLocation";

-- CreateTable
CREATE TABLE "inventoryLocation" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventoryLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventoryWarehouse" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventoryWarehouse_pkey" PRIMARY KEY ("id")
);

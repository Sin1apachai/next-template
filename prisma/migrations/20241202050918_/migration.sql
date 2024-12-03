/*
  Warnings:

  - You are about to drop the column `create_at` on the `inventoryLocation` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `inventoryLocation` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `inventoryWarehouse` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `inventoryWarehouse` table. All the data in the column will be lost.
  - You are about to drop the `res_accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `res_sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `res_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `inventoryLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `inventoryWarehouse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "res_accounts" DROP CONSTRAINT "res_accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "res_sessions" DROP CONSTRAINT "res_sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "inventoryLocation" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "inventoryWarehouse" DROP COLUMN "create_at",
DROP COLUMN "update_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "res_accounts";

-- DropTable
DROP TABLE "res_sessions";

-- DropTable
DROP TABLE "res_users";

-- DropTable
DROP TABLE "verification_tokens";

-- CreateTable
CREATE TABLE "resUsers" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resUsers_email_key" ON "resUsers"("email");

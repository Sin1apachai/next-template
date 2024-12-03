/*
  Warnings:

  - You are about to drop the column `createdAt` on the `inventoryLocation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `inventoryLocation` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `inventoryWarehouse` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `inventoryWarehouse` table. All the data in the column will be lost.
  - You are about to drop the `resUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `update_at` to the `inventoryLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `inventoryWarehouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventoryLocation" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "inventoryWarehouse" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "resUsers";

-- CreateTable
CREATE TABLE "res_accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "res_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "res_sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "res_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "res_users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "image" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "res_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "res_accounts_provider_provider_account_id_key" ON "res_accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "res_sessions_session_token_key" ON "res_sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "res_users_email_key" ON "res_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "res_accounts" ADD CONSTRAINT "res_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "res_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "res_sessions" ADD CONSTRAINT "res_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "res_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

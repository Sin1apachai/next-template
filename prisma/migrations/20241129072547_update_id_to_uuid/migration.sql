/*
  Warnings:

  - The primary key for the `resUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "resUsers" DROP CONSTRAINT "resUsers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "resUsers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "resUsers_id_seq";

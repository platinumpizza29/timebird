/*
  Warnings:

  - You are about to drop the column `endTime` on the `Hours` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Hours` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hours" DROP COLUMN "endTime",
DROP COLUMN "startTime";

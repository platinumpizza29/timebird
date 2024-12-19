/*
  Warnings:

  - The primary key for the `TimeEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endTime` on the `TimeEntry` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `TimeEntry` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TimeEntry` table. All the data in the column will be lost.
  - The `id` column on the `TimeEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clerkId` to the `TimeEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourlyRate` to the `TimeEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursWorked` to the `TimeEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TimeEntry" DROP CONSTRAINT "TimeEntry_userId_fkey";

-- DropIndex
DROP INDEX "TimeEntry_userId_idx";

-- AlterTable
ALTER TABLE "TimeEntry" DROP CONSTRAINT "TimeEntry_pkey",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "hourlyRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hoursWorked" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TimeEntry_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";

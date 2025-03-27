/*
  Warnings:

  - You are about to drop the `OvertimeLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rota` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OvertimeLog" DROP CONSTRAINT "OvertimeLog_payRateId_fkey";

-- DropForeignKey
ALTER TABLE "OvertimeLog" DROP CONSTRAINT "OvertimeLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rota" DROP CONSTRAINT "Rota_userId_fkey";

-- DropTable
DROP TABLE "OvertimeLog";

-- DropTable
DROP TABLE "Rota";

-- DropEnum
DROP TYPE "RotaType";

-- CreateTable
CREATE TABLE "Hours" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "department" TEXT NOT NULL,
    "isOvertime" BOOLEAN NOT NULL,
    "overtime" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Hours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hours" ADD CONSTRAINT "Hours_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

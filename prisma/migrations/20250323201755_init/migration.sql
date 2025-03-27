-- CreateEnum
CREATE TYPE "RotaType" AS ENUM ('WEEKLY', 'BIWEEKLY', 'FOURWEEKLY');

-- CreateEnum
CREATE TYPE "PayRateType" AS ENUM ('BASE', 'WEEKDAY_OVERTIME', 'WEEKEND_OVERTIME', 'HOLIDAY_OVERTIME');

-- CreateTable
CREATE TABLE "Rota" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "schedule" JSONB NOT NULL,
    "type" "RotaType" NOT NULL DEFAULT 'WEEKLY',

    CONSTRAINT "Rota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OvertimeLog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "payRateId" INTEGER NOT NULL,

    CONSTRAINT "OvertimeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayRate" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "PayRateType" NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayRate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rota" ADD CONSTRAINT "Rota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvertimeLog" ADD CONSTRAINT "OvertimeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OvertimeLog" ADD CONSTRAINT "OvertimeLog_payRateId_fkey" FOREIGN KEY ("payRateId") REFERENCES "PayRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayRate" ADD CONSTRAINT "PayRate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

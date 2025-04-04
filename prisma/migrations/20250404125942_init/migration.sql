-- AlterTable
ALTER TABLE "Hours" ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "stripeCustomerId" TEXT;

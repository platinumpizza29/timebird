/*
  Warnings:

  - Added the required column `date` to the `Hours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `Hours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hours" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hours" DECIMAL(65,30) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `updatedA` on the `RevenueStamp` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `RevenueStamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RevenueStamp" DROP COLUMN "updatedA",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `RevenueStamp` table. All the data in the column will be lost.
  - Added the required column `updatedA` to the `RevenueStamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RevenueStamp" DROP COLUMN "updatedAt",
ADD COLUMN     "updatedA" TIMESTAMP(3) NOT NULL;

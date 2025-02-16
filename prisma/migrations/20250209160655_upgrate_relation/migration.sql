/*
  Warnings:

  - You are about to drop the column `created_at` on the `RevenueStamp` table. All the data in the column will be lost.
  - You are about to drop the column `memo` on the `RevenueStamp` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `RevenueStamp` table. All the data in the column will be lost.
  - You are about to drop the column `total_consumption_amount` on the `RevenueStamp` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `RevenueStamp` table. All the data in the column will be lost.
  - Added the required column `totalConsumptionAmount` to the `RevenueStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantity` to the `RevenueStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RevenueStamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RevenueStamp" DROP COLUMN "created_at",
DROP COLUMN "memo",
DROP COLUMN "quantity",
DROP COLUMN "total_consumption_amount",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalConsumptionAmount" INTEGER NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Stamp" (
    "id" SERIAL NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevenueStampDetail" (
    "id" SERIAL NOT NULL,
    "consumptionAmount" INTEGER NOT NULL,
    "stampId" INTEGER NOT NULL,
    "revenueStampId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "memo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RevenueStampDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RevenueStampDetail" ADD CONSTRAINT "RevenueStampDetail_stampId_fkey" FOREIGN KEY ("stampId") REFERENCES "Stamp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevenueStampDetail" ADD CONSTRAINT "RevenueStampDetail_revenueStampId_fkey" FOREIGN KEY ("revenueStampId") REFERENCES "RevenueStamp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

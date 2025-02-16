-- CreateTable
CREATE TABLE "RevenueStamp" (
    "id" SERIAL NOT NULL,
    "total_consumption_amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RevenueStamp_pkey" PRIMARY KEY ("id")
);

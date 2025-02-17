import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { RevenueStamp } from "@/types/revenueStamp";

export async function POST(request: Request) {
  try {
    const revenueStamps: RevenueStamp[] = await request.json();
    const totalQuantity: number = revenueStamps.reduce((sum: number, stamp: RevenueStamp) => sum + stamp.quantity, 0);
    const totalConsumptionAmount: number = revenueStamps.reduce((sum: number, stamp: RevenueStamp) => sum + (stamp.quantity * stamp.unitPrice), 0);
    
    const newRevenueStamp = await prisma.revenueStamp.create({
      data: {
        totalConsumptionAmount: totalConsumptionAmount,
        totalQuantity: totalQuantity,
        revenueStampDetails: {
          create: await Promise.all(revenueStamps.map(async (revenueStamp) => {
            const stamp = await prisma.stamp.findFirst({
              where: { unitPrice: revenueStamp.unitPrice },
            });

            if (!stamp) {
              throw new Error(`Stamp with unitPrice ${revenueStamp.unitPrice} not found`);
            }

            return {
              consumptionAmount: revenueStamp.unitPrice * revenueStamp.quantity,
              quantity: revenueStamp.quantity,
              memo: revenueStamp.memo,
              stamp: { connect: { id: stamp.id } },
            };
          })),
        },
      },
    });
    return NextResponse.json(newRevenueStamp, { status: 201 });
  } catch (error) {
    console.error('Error creating new stamp:', error);
    return NextResponse.json({ error: 'Failed to create new stamp', details: error.message }, { status: 500 });
  }
}
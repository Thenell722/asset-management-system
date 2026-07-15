import prisma from "@/lib/prisma";

export async function GET() {
  const assets = await prisma.asset.findMany();

  return Response.json(assets);
}

export async function POST(request) {
  const data = await request.json();

  const asset = await prisma.asset.create({
    data: {
      ...data,
      purchaseDate: new Date(data.purchaseDate),
      warrantyExpiry: data.warrantyExpiry
        ? new Date(data.warrantyExpiry)
        : null,
      purchaseCost: parseFloat(data.purchaseCost),
    },
  });

  return Response.json(asset);
}


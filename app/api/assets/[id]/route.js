import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {

  const { id } = await params;

  const data = await request.json();


  const asset = await prisma.asset.update({

    where: {
      id: id,
    },

    data: {
      assetTag: data.assetTag,
      category: data.category,
      manufacturer: data.manufacturer,
      model: data.model,
      serialNumber: data.serialNumber,

      purchaseDate: new Date(data.purchaseDate),

      purchaseCost: parseFloat(data.purchaseCost),

      warrantyExpiry: data.warrantyExpiry
        ? new Date(data.warrantyExpiry)
        : null,

      status: data.status,
      assignedEmployee: data.assignedEmployee,
      location: data.location,
      department: data.department,
      condition: data.condition,
      notes: data.notes,
    },

  });


  return Response.json(asset);

}

export async function DELETE(request, { params }) {

  const { id } = await params;

  const asset = await prisma.asset.delete({

    where:{
      id:id,
    },

  });


  return Response.json(asset);

}
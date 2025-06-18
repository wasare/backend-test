const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: "minimal"});


async function orderOfferingData() {
  const orderOfferingItemCount = await prisma.orderOffering.count();

  if (orderOfferingItemCount > 0) {
    await prisma.orderOffering.deleteMany({});
    console.log('Items dos Pedidos excluídos com sucesso!');
  } else {
    console.log('A tabela de Items dos pedidos Não contém registros.');
  }
}

async function orderData() {
  const orderItemCount = await prisma.order.count();

  if (orderItemCount > 0) {
    await prisma.order.deleteMany({});
    await prisma.$executeRaw`
      DELETE FROM sqlite_sequence WHERE name = 'Order';
    `;
    console.log('Pedidos excluídos com sucesso!');
  } else {
    console.log('A tabela de pedidos Não contém registros.');
  }
}

async function offeringData() {
  const offeringItemCount = await prisma.offering.count();

  if (offeringItemCount > 0) {
    await prisma.offering.deleteMany({});
    await prisma.$executeRaw`
      DELETE FROM sqlite_sequence WHERE name = 'Offering';
    `;
    console.log('Ofertas excluídas com sucesso!');
  } else {
    console.log('A tabela de ofertas Não contém registros.');
  }
}

async function assetData() {
  const assetItemCount = await prisma.asset.count();

  if (assetItemCount > 0) {
    await prisma.asset.deleteMany({});
    await prisma.$executeRaw`
      DELETE FROM sqlite_sequence WHERE name = 'Asset';
    `;
    console.log('Assets excluídas com sucesso!');
  } else {
    console.log('A tabela de assets Não contém registros.');
  }
}

async function userData() {
  const userCount = await prisma.user.count();

  if (userCount > 0) {
    await prisma.user.deleteMany({});
    await prisma.$executeRaw`
      DELETE FROM sqlite_sequence WHERE name = 'User';
    `;
    console.log('Usuários excluídos com sucesso!');
  } else {
    console.log('A tabela de users NÃO contém registros.');
  }
}

const deleteData = async () => {
  await orderOfferingData();
  await orderData();
  await offeringData();
  await assetData();
  await userData();
}

deleteData();
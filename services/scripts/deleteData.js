const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: "minimal"});

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

offeringData();

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

userData();
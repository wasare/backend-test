const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({errorFormat: "minimal"});
const bcrypt = require('bcryptjs');

const args = process.argv.slice(2);
const hasPizza  = args.includes('--pizza');

const pizzaItems = [
  {
    name: "Margherita",
    description: "Molho de tomate, mussarela, manjericão, azeite",
    price: 25.99,
    image: "uploads/margherita.jpg",
    enabled: true,
    featured: true,
  },
  {
    name: "Pepperoni",
    description: "Molho de tomate, mussarela, pepperoni",
    price: 29.99,
    image: "uploads/pepperoni.jpg",
    enabled: true,
    featured: true,
  },
  {
    name: "Quatro Queijos",
    description: "Molho de tomate, quatro queijos",
    price: 32.99,
    image: "uploads/quatro-queijos.jpg",
    enabled: true,
    featured: false,
  },
  {
    name: "Frango com Catupiry",
    description: "Molho de tomate, frango desfiado, catupiry",
    price: 34.99,
    image: "uploads/frango-com-catupiry.jpg",
    enabled: true,
    featured: false,
  },
  {
    name: "Calabresa",
    description: "Molho de tomate, mussarela, calabresa fatiada",
    price: 28.99,
    image: "uploads/calabresa.jpg",
    enabled: true,
    featured: true,
  },
  {
    name: "Portuguesa",
    description: "Molho de tomate, presunto, ovos, cebola, azeitonas",
    price: 30.99,
    image: "uploads/portuguesa.jpg",
    enabled: false,
    featured: false,
  },
  {
    name: "Vegetariana",
    description: "Molho de tomate, cogumelos, abobrinha, pimentão",
    price: 27.99,
    image: "uploads/vegetariana.jpg",
    enabled: true,
    featured: false,
  },
  {
    name: "Almôndegas",
    description: "Molho de tomate, mussarela, almôndegas",
    price: 22.99,
    image: "uploads/almndegas.jpg",
    enabled: true,
    featured: true,
  },
  {
    name: "Palmito",
    description: "Molho de tomate, mussarela, palmito",
    price: 31.99,
    image: "uploads/palmito.jpg",
    enabled: false,
    featured: false,
  },
  {
    name: "Carbonara",
    description: "Molho de tomate, bacon, ovos, queijo parmesão",
    price: 35.99,
    image: "uploads/carbonara.jpg",
    enabled: true,
    featured: false,
  }
];

const brigadeiroItems = [
  {
    name: "Brigadeiro de Pistache",
    description: "Brigadeiro cremoso com toque de pistache torrado e cobertura de lascas de pistache.",
    price: 6.5,
    image: "uploads/brigadeiro-de-pistache.png",
    enabled: true,
    featured: false
  },
  {
    name: "Brigadeiro Red Velvet",
    description: "Brigadeiro inspirado em red velvet, com cacau premium e um leve toque de cream cheese.",
    price: 7.0,
    image: "uploads/brigadeiro-red-velvet.png",
    enabled: true,
    featured: true
  },
  {
    name: "Brigadeiro Champagne",
    description: "Brigadeiro sofisticado feito com redução de champagne brut, finalizado com leve brilho metálico.",
    price: 8.25,
    image: "uploads/brigadeiro-champagne.png",
    enabled: true,
    featured: true
  },
  {
    name: "Brigadeiro Caramelo Salgado",
    description: "Brigadeiro mesclado com caramelo salgado artesanal e flor de sal no topo.",
    price: 6.75,
    image: "uploads/brigadeiro-caramelo-salgado.png",
    enabled: true,
    featured: false
  },
  {
    name: "Brigadeiro Matcha & White",
    description: "Brigadeiro de chocolate branco infusionado com matcha premium japonês.",
    price: 7.5,
    image: "uploads/brigadeiro-matcha-white.png",
    enabled: true,
    featured: false
  }
];

async function offeringData() {
    const offeringItemCount = await prisma.offering.count();
    const offeringItems = hasPizza ? pizzaItems : brigadeiroItems;

    if (offeringItemCount === 0) {
      
      await prisma.offering.createMany({
        data: offeringItems,
      });

      console.log('Ofertas criadas com sucesso!');
    } else {
      console.log('A tabela de ofertas já contém registros.');
    }
}

offeringData();

async function userData() {
  const userCount = await prisma.user.count();

  if (userCount === 0) {
    const password = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: "admin@example.com",
        name:  "Usuário Administrador",
        password,
        is_admin: true
      },
    });

    console.log('\nUsuario admin@example.com criado com sucesso! Senha: admin123 - para alterar PATCH /api/users/{id}');
    console.log('Para alterar a senha POST /api/users/login e depois PATCH /api/users/{id}');
  } else {
    console.log('A tabela de users já contém registros.');
  }
}

userData();
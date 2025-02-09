// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios de ejemplo
  const user1 = await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "Admin User",
      password: "$2a$12$fyrUAxLEmKlYXyyKWHcb9OAp0hyL1QnFwp.6V3AVXijRL0nbz4y.a",
      emailVerified: new Date()
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "psicforen_angyrc@outlook.com",
      name: "Angelica Ruiz",
      password: "$2a$12$fyrUAxLEmKlYXyyKWHcb9OAp0hyL1QnFwp.6V3AVXijRL0nbz4y.a",
      emailVerified: new Date()
    },
  });
  await prisma.psychologist.createMany({
    data: [
      {
        name: "Kelvin",
        last_name: "Mendiola",
      },
      {
        name: "Joyselin",
        last_name: "Espinoza",
      },
      {
        name: "Jesus",
        last_name: "Albavera",
      },
      {
        name: "Karen",
        last_name: "Gonzales",
      },
      {
        name: "Guadalupe",
        last_name: "Clemente",
      },
      {
        name: "Ericka",
        last_name: "Miranda",
      },
      {
        name: "Edith",
        last_name: "Rosales",
      },
      {
        name: "Angélica",
        last_name: "Ruiz",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
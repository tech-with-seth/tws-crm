import { InteractionType, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

import { createCustomer } from "~/models/customer.server";
import { getUserByEmail } from "~/models/user.server";
import { createInteractionWithComments } from "~/models/interaction.server";
import { getRandomNumber, pickRandom } from "~/utils/common";

const prisma = new PrismaClient();

async function main() {
  const email = "seth@mail.com";

  let user = await getUserByEmail(email);

  if (!user) {
    const hashedPassword = await bcrypt.hash("asdfasdf", 10);

    user = await prisma.user.create({
      data: {
        email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });

    console.log(`Created user with email: ${user.email}`);
  }

  //   await prisma.customer.deleteMany({}).catch(() => {});
  //   await prisma.interaction.deleteMany({}).catch(() => {});

  for await (let _ of Array(getRandomNumber(1, 5))) {
    const fakeEmail = faker.internet.email();

    const customer = await createCustomer({
      email: fakeEmail,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
    });

    for await (let _ of Array(getRandomNumber(1, 5))) {
      await createInteractionWithComments(
        {
          authorId: user.id,
          customerId: customer.id,
          type: pickRandom([
            InteractionType["TEXT_MESSAGE"],
            InteractionType["EMAIL"],
            InteractionType["PHONE_CALL"],
          ]),
          description: faker.lorem.paragraph(),
        },
        [
          {
            authorId: user.id,
            content: faker.lorem.sentence(),
          },
          {
            authorId: user.id,
            content: faker.lorem.sentence(),
          },
        ],
      );
    }
    console.log(`Created customer with email: ${fakeEmail}`);
  }

  console.log(`Database has been seeded. 🌱`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error("Usage: npx tsx prisma/create-admin.ts <email> <password>");
    process.exit(1);
  }

  const email = args[0];
  const password = args[1];

  console.log(`Creating admin user: ${email}`);

  // Check if user already exists
  const existingUser = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (existingUser) {
    console.error(`User with email ${email} already exists!`);
    process.exit(1);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create the user
  const admin = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
    },
  });

  console.log(`Successfully created admin user with ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error("Error creating admin user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

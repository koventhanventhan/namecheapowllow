const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be provided.');
    console.error('Usage: ADMIN_EMAIL=me@example.com ADMIN_PASSWORD=secret node scripts/create-admin.js');
    process.exit(1);
  }

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.error(`Error: An admin user with the email '${email}' already exists.`);
    process.exit(1);
  }

  // bcryptjs hash, matching standard next-auth credentials implementations
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
    },
  });

  console.log(`Successfully created admin user: ${email}`);
}

main()
  .catch((e) => {
    console.error('Failed to create admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

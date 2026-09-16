import { PrismaClient } from '@prisma/client';
import { blogPosts, portfolioItems } from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed database...');

  // Seed Blog Posts
  console.log('Seeding Blog Posts...');
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: `Content for ${post.title}...`, // lib/data.ts doesn't have full content, adding a placeholder
        coverImage: post.image,
        author: post.author,
        publishedAt: new Date(post.machineDate || post.date),
      },
    });
  }
  console.log('Blog Posts seeded successfully.');

  // Seed Projects (Portfolio Items)
  console.log('Seeding Projects...');
  for (const item of portfolioItems) {
    // Generate a slug from the title as slug is required in DB but not in data.ts
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    await prisma.project.upsert({
      where: { slug: slug },
      update: {},
      create: {
        title: item.title,
        slug: slug,
        description: item.description,
        imageUrl: item.image,
        category: item.category,
        tags: item.tags?.join(','),
        liveUrl: item.link,
      },
    });
  }
  console.log('Projects seeded successfully.');

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

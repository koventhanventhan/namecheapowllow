import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { PageLayout } from '@/components/layout/page-layout';
import { Container } from '@/components/ui/container';
import { CalendarDays, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true },
  });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });
  return {
    title: post ? `${post.title} | Owllow IT Blog` : 'Blog Post',
    description: post?.excerpt || 'Read our latest blog post on Owllow IT Solutions.',
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  const publishDate = new Date(post.publishedAt || post.createdAt);

  return (
    <PageLayout showCta={true}>
      <article className="pb-20 pt-32">
        <Container className="max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={publishDate.toISOString()}>
                  {publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                5 min read
              </span>
              {post.author && (
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">By {post.author}</span>
                </span>
              )}
            </div>
          </header>

          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl mb-12 shadow-xl border border-border">
            <Image
              src={post.coverImage || '/placeholder.jpg'}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p className="text-muted-foreground italic">This post has no content.</p>
            )}
          </div>
          
          <div className="mt-16 pt-8 border-t border-border text-center">
            <h3 className="text-xl font-bold mb-4">Looking for customized IT solutions?</h3>
            <p className="text-muted-foreground mb-6">Discover how our expert team can help transform your business operations.</p>
            <Link href="/services" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Explore Our Services
            </Link>
          </div>
        </Container>
      </article>
    </PageLayout>
  );
}

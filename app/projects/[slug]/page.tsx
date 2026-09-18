import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PageLayout } from '@/components/layout/page-layout';
import { Container } from '@/components/ui/container';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  });
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <PageLayout showCta={true}>
      <article className="pb-20 pt-32">
        <Container className="max-w-5xl">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-primary/10 text-primary border-primary/20">{project.category || 'Project'}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">{project.title}</h1>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags?.split(',').map((tag) => (
                  <span key={tag.trim()} className="rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
                    {tag.trim()}
                  </span>
                ))}
              </div>

              {project.liveUrl && (
                <Button asChild size="lg" className="rounded-full px-8">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    View Live Site <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>

            <div className="relative aspect-square md:aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl border border-border">
              <Image
                src={project.imageUrl || '/placeholder.jpg'}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </article>
    </PageLayout>
  );
}

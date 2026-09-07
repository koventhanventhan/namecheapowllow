'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock, Search, Tag, ChevronRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/data';
import { useTilt } from '@/hooks/use-tilt';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

// Helper component for Article Card to use the hook independently
function ArticleGridCard({ post, delayClass }: { post: any, delayClass: string }) {
  const { ref, isRevealed } = useScrollReveal();
  
  return (
    <article 
      ref={ref}
      className={cn(
        "group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-[6px] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 opacity-0",
        isRevealed ? `fade-in-up ${delayClass}` : ""
      )}
    >
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          sizes="(max-width: 768px) 90vw, 33vw" 
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.1]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
        <Badge className="absolute bottom-4 left-4 border-0 bg-primary text-primary-foreground">{post.category}</Badge>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /><time dateTime={post.machineDate}>{post.date}</time></span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
        </div>
        <h3 className="mt-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">{post.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
          <span className="text-xs text-muted-foreground font-medium">By {post.author}</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

function SidebarCard({ title, children, delayClass }: { title: string, children: React.ReactNode, delayClass: string }) {
  const { ref, isRevealed } = useScrollReveal();
  return (
    <div 
      ref={ref} 
      className={cn(
        "rounded-2xl border border-border bg-card p-6 opacity-0",
        isRevealed ? `fade-in-up ${delayClass}` : ""
      )}
    >
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const gridPosts = blogPosts.slice(1);
  const categories = ['Cloud', 'Security', 'Development', 'AI & Machine Learning', 'IT Strategy'];
  
  const { tiltStyle, handleMouseMove, handleMouseLeave } = useTilt({ max: 2, scale: 1 });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.machineDate,
      author: { '@type': 'Person', name: post.author },
      description: post.excerpt,
      image: post.image,
    })),
  };

  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pb-20">
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 overflow-hidden bg-background">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-6 opacity-0 fade-in-up delay-100">
                From the Blog
              </h1>
              <p className="text-lg text-muted-foreground opacity-0 fade-in-up delay-200">
                Ideas, Insights & Inspiration — Stay ahead of the curve with the latest technology trends, best practices, and expert perspectives from our IT specialists.
              </p>
            </div>
            
            {/* Nav Links */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-b border-border pb-4 opacity-0 fade-in-up delay-300">
              <Link href="#" className="nav-link-animated text-sm font-semibold text-foreground">All Articles</Link>
              <Link href="#" className="nav-link-animated text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Cloud Solutions</Link>
              <Link href="#" className="nav-link-animated text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Cybersecurity</Link>
              <Link href="#" className="nav-link-animated text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Software Dev</Link>
            </div>
          </Container>
        </section>

        {/* Featured Article */}
        <section className="py-8">
          <Container>
            <Link 
              href={`/blog/${featuredPost.slug}`}
              className="block group opacity-0 fade-in-up delay-400"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ ...tiltStyle, transformStyle: 'preserve-3d' }}
            >
              <div className="relative rounded-3xl overflow-hidden border border-border shadow-lg bg-card">
                <div className="grid md:grid-cols-2 gap-0 h-full min-h-[400px]">
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <Image 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      fill 
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.1]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{featuredPost.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 ml-2"><CalendarDays className="h-3.5 w-3.5" /> <time dateTime={featuredPost.machineDate}>{featuredPost.date}</time></span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 transition-colors duration-300 group-hover:text-primary leading-tight" style={{ transform: 'translateZ(20px)' }}>
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-8 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold" aria-label={featuredPost.author}>
                        {featuredPost.author.charAt(0)}
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-foreground">{featuredPost.author}</p>
                        <p className="text-xs text-muted-foreground">{featuredPost.readTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Container>
        </section>

        {/* Main Content Grid */}
        <section className="py-12">
          <Container>
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              
              {/* Article Grid */}
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                {gridPosts.map((post, index) => (
                  <ArticleGridCard key={post.id} post={post} delayClass={`delay-${(index % 3 + 1) * 100}`} />
                ))}
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                
                <SidebarCard title="Search Articles" delayClass="delay-100">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search articles by keyword, topic, or author..." 
                      aria-label="Search blog articles"
                      className="pl-9 bg-background transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary" 
                    />
                  </div>
                </SidebarCard>

                <SidebarCard title="Must Reads" delayClass="delay-200">
                  <ul className="space-y-4">
                    {blogPosts.map((post, i) => (
                      <li key={post.id}>
                        <Link href={`/blog/${post.slug}`} className="group flex gap-3 items-start">
                          <span className="text-2xl font-serif font-black text-muted-foreground/30 group-hover:text-primary/50 transition-colors">0{i+1}</span>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                            <span className="text-xs text-muted-foreground mt-1 block"><time dateTime={post.machineDate}>{post.date}</time></span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </SidebarCard>

                <SidebarCard title="Topics" delayClass="delay-300">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Link 
                        key={cat} 
                        href={`/blog?category=${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 text-xs font-medium text-foreground border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                      >
                        <Tag className="h-3 w-3" />
                        {cat}
                      </Link>
                    ))}
                  </div>
                </SidebarCard>

                <SidebarCard title="Newsletter" delayClass="delay-400">
                  <p className="text-sm text-muted-foreground mb-4">Get the latest insights delivered straight to your inbox.</p>
                  <form className="space-y-3">
                    <Input 
                      placeholder="Email address" 
                      className="bg-background transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary" 
                    />
                    <Button className="w-full">Subscribe</Button>
                  </form>
                </SidebarCard>

              </aside>
            </div>
          </Container>
        </section>

      </div>
    </PageLayout>
  );
}

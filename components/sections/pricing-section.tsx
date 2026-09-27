'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PricingPlan } from '@prisma/client';
import { cn } from '@/lib/utils';

interface PricingSectionProps {
  isPageHeader?: boolean;
  pricingPlans: PricingPlan[];
}

export function PricingSection({ isPageHeader = false, pricingPlans = [] }: PricingSectionProps) {
  return (
    <section id="pricing" className="section-padding bg-card/50">
      <Container>
        <SectionHeading

          title="Plans That Scale with Your Business"
          description="Transparent, flexible pricing with no hidden fees. Choose the plan that fits your needs and upgrade anytime."
          as={isPageHeader ? 'h1' : 'h2'}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-start">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
                plan.isFeatured
                  ? 'border-primary shadow-xl shadow-primary/10 lg:-mt-4 lg:mb-[-1rem]'
                  : 'border-border hover:border-primary/30'
              )}
            >
              {plan.isFeatured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-0 bg-primary hover:bg-primary-600 px-4 text-white">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-xl font-bold text-foreground dark:text-white">{plan.name}</h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold font-heading text-foreground">${plan.price}</span>
                <span className="text-sm text-muted-foreground">/{plan.billingPeriod}</span>
              </div>
              <Button
                asChild
                className={cn(
                  'mt-6 w-full',
                  plan.isFeatured
                    ? 'bg-gradient-to-r from-primary to-primary-900 hover:from-primary-600 hover:to-primary-600 text-white shadow-lg shadow-primary/20'
                    : 'bg-transparent'
                )}
                variant={plan.isFeatured ? 'default' : 'outline'}
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="my-6 h-px bg-border" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Everything included</p>
              <ul className="mt-4 space-y-3">
                {plan.features.split('\\n').map((feature) => feature.trim() ? (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-success" />
                    {feature}
                  </li>
                ) : null)}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

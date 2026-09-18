'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubscribe} className="mt-4 flex gap-2 max-w-sm">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button
          type="submit"
          aria-label="Subscribe"
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 overflow-hidden"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
      {subscribed && (
        <p className="mt-2 text-xs font-medium text-success">
          Thanks for subscribing!
        </p>
      )}
    </>
  );
}

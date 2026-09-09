'use client';

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { MapPin, Mail, Phone, CalendarClock, CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContactSectionProps {
  isPageHeader?: boolean;
}

export function ContactSection({ isPageHeader = false }: ContactSectionProps = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.';
    if (!form.subject.trim()) nextErrors.subject = 'Please enter a subject.';
    if (!form.message.trim()) nextErrors.message = 'Please tell us how we can help.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setErrors({ recaptcha: 'Please complete the reCAPTCHA to verify you are human.' });
      return;
    }

    setIsSubmitting(true);
    try {
      // POSTing to our new PHP script for cPanel
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('subject', form.subject);
      formData.append('message', form.message);
      formData.append('recaptchaToken', recaptchaValue);

      const response = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        recaptchaRef.current?.reset();
      } else {
        setErrors({ message: data.message || 'Something went wrong. Please try again later.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ message: 'Failed to send message. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-background">

      <Container className="relative">
        <SectionHeading
          title="Ready to Transform Your Business?"
          description="Tell us about your project and we'll get back to you within one business day."
          as={isPageHeader ? 'h1' : 'h2'}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-background p-7 sm:p-8 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:border-primary transition-all duration-500">
              <h3 className="text-xl font-bold text-foreground">Get in touch</h3>
              <p className="mt-2 text-sm text-muted-foreground">Have a question or ready to start? Our team is here to help.</p>
              <div className="mt-8 space-y-5">
                <a href="mailto:info@owllow.com" className="flex items-start gap-3 group hover:opacity-80 transition-opacity">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@owllow.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-3 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-foreground">Phone</p>
                    <a href="https://wa.me/+94767206279" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      +94 (76) 720-6279
                    </a>
                    <a href="tel:+64223672717" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      +64 (22) 367-2717
                    </a>
                  </div>
                </div>

                <a href="https://maps.google.com/?q=Kuppilan+North,+Erlalai,+Jaffna,+Sri+Lanka" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group hover:opacity-80 transition-opacity">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Office</p>
                    <p className="text-sm text-muted-foreground">Kuppilan North, Erlalai, Jaffna, Sri Lanka</p>
                  </div>
                </a>
              </div>
              <div className="mt-8 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-5"><p className="text-sm font-semibold text-foreground">Prefer to schedule a call?</p><p className="mt-1 text-xs text-muted-foreground">Book a free 30-minute consultation with one of our experts.</p><a href="tel:+94767206279"><Button variant="link" className="mt-2 h-auto p-0 text-primary">Schedule a call <CalendarClock className="ml-2 h-4 w-4" /></Button></a></div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-background p-7 sm:p-8 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:border-primary transition-all duration-500">
              {submitted ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success"><CheckCircle2 className="h-8 w-8" /></div><h3 className="mt-5 text-2xl font-bold text-foreground">Message sent successfully!</h3><p className="mt-2 max-w-sm text-sm text-muted-foreground">Thanks for reaching out. One of our experts will get back to you within one business day.</p><Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6">Send another message</Button></div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="name">Your name</Label><Input id="name" placeholder="Gunam Venthan" value={form.name} onChange={(e) => updateField('name', e.target.value)} aria-invalid={!!errors.name} />{errors.name && <p className="text-xs text-destructive">{errors.name}</p>}</div>
                  <div className="space-y-2"><Label htmlFor="email">Email address</Label><Input id="email" type="email" placeholder="info@owllow.com" value={form.email} onChange={(e) => updateField('email', e.target.value)} aria-invalid={!!errors.email} />{errors.email && <p className="text-xs text-destructive">{errors.email}</p>}</div>
                  <div className="space-y-2 sm:col-span-2"><Label htmlFor="subject">Subject</Label><Input id="subject" placeholder="How can we help?" value={form.subject} onChange={(e) => updateField('subject', e.target.value)} aria-invalid={!!errors.subject} />{errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}</div>
                  <div className="space-y-2 sm:col-span-2"><Label htmlFor="message">Message</Label><Textarea id="message" placeholder="Tell us a little about your project..." rows={6} value={form.message} onChange={(e) => updateField('message', e.target.value)} aria-invalid={!!errors.message} />{errors.message && <p className="text-xs text-destructive">{errors.message}</p>}</div>
                  <div className="sm:col-span-2">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                      onChange={() => {
                        if (errors.recaptcha) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.recaptcha;
                            return newErrors;
                          });
                        }
                      }}
                    />
                    {errors.recaptcha && <p className="text-xs text-destructive mt-1">{errors.recaptcha}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full bg-gradient-to-r from-primary to-primary-900 hover:from-primary-600 hover:to-primary-600 text-white shadow-lg shadow-primary/20 sm:w-auto">
                      {isSubmitting ? 'Sending...' : 'Send message'}
                      {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Full-width Map Card */}
        <div className="mt-10 rounded-2xl border border-border bg-background p-7 sm:p-8 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:border-primary transition-all duration-500">
          <h3 className="text-2xl font-bold text-foreground">Find us here</h3>
          <div className="mt-6 relative w-full h-[400px] rounded-2xl overflow-hidden border border-border/50 shadow-inner">
            <iframe
              src="https://maps.google.com/maps?hl=en&amp;q=Kuppilan%20Kenniyadi%20Vairavar%20Kovil&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Owllow IT Office Location"
              className="w-full h-full border-0 dark:invert dark:hue-rotate-180 dark:contrast-75"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tech Blog | Cloud, Cybersecurity & Software Development Insights | Owllow",
  description: "Explore expert insights on cloud computing, cybersecurity, and software development from Owllow's IT specialists. Stay ahead with the latest tech trends and best practices.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

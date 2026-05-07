import { Metadata } from 'next';
import PayClient from './PayClient';

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const username = params.username;
  return {
    title: `Pay @${username} | SwiftLink`,
    description: `Send secure CELO or stablecoin payments to @${username} instantly via SwiftLink.`,
    openGraph: {
      title: `Pay @${username} on SwiftLink`,
      description: `Fast, secure, and mobile-first payments on Celo. Scan to pay @${username}.`,
      images: [`/api/og?username=${username}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Pay @${username} on SwiftLink`,
      description: `The fastest way to send money on Celo.`,
      images: [`/api/og?username=${username}`],
    },
  };
}

export default function Page({ params, searchParams }: { params: { username: string }, searchParams: { amount?: string, desc?: string } }) {
  return <PayClient params={params} searchParams={searchParams} />;
}

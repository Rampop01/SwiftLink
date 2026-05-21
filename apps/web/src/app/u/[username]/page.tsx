import { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const username = params.username;
  return {
    title: `@${username} | SwiftLink Profile`,
    description: `View @${username}'s public profile on SwiftLink. Send secure CELO or stablecoin payments instantly.`,
    openGraph: {
      title: `@${username} on SwiftLink`,
      description: `Fast, secure, and mobile-first payments on Celo. View profile and send funds.`,
      images: [`/api/og?username=${username}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `@${username} on SwiftLink`,
      description: `The fastest way to send money on Celo.`,
      images: [`/api/og?username=${username}`],
    },
  };
}

export default function Page({ params }: { params: { username: string } }) {
  return <ProfileClient params={params} />;
}

import { Metadata } from 'next';
import BatchClient from './BatchClient';

export const metadata: Metadata = {
  title: 'Batch Payments | SwiftLink',
  description: 'Send crypto to multiple SwiftLink users at once.',
};

export default function BatchPage() {
  return <BatchClient />;
}

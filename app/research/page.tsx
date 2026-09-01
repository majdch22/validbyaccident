import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/site-chrome';

export const metadata: Metadata = { title: 'Research index' };
const records = [
  { id: 'CR-001', area: 'Web', title: 'The preview server was also a file server', status: 'Disclosed', href: '/research/preview-server-file-disclosure' },
  { id: 'CR-002', area: 'Web', title: 'Cross-boundary messaging in embedded applications', status: 'Candidate', href: '/research/cross-boundary-messaging' },
  { id: 'CR-003', area: 'Desktop', title: 'Parsing an untrusted project file', status: 'Under review', href: '/method' },
  { id: 'NOTE-01', area: 'Method', title: 'From suspicious behavior to defensible finding', status: 'Working note', href: '/method' },
];

export default function Research() {
  return <main><Header/><section className="page-shell shell"><div className="page-title"><p className="eyebrow">Research index</p><h1>Investigations, not claims.</h1><p className="lede">A public record of sanitized research. Status labels distinguish working hypotheses from validated and disclosed findings.</p></div><div className="index-list">{records.map(record => <Link className="index-row" href={record.href} key={record.id}><small>{record.id}</small><small>{record.area}</small><strong>{record.title}</strong><small>{record.status} →</small></Link>)}</div></section><Footer/></main>;
}

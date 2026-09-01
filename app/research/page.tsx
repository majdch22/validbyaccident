import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/site-chrome';
import { researchRecords } from '@/lib/research-records';

export const metadata: Metadata = { title: 'Research index' };
const records = [
  { id:'CR-001', area:'Web', title:'The preview server was also a file server', status:'Duplicate / resolved', href:'/research/preview-server-file-disclosure' },
  ...researchRecords.map(record=>({id:record.id,area:record.area,title:record.title,status:record.result,href:`/research/${record.slug}`})),
];

export default function Research(){return <main><Header/><section className="page-shell shell"><div className="page-title"><p className="eyebrow">Research index / 12 records</p><h1>What broke, and why it mattered.</h1><p className="lede">Anonymized case studies from resolved web research: paid findings, independently discovered duplicates, and the proof that turned odd behavior into a security boundary.</p></div><div className="index-list">{records.map(record=><Link className="index-row" href={record.href} key={record.id}><small>{record.id}</small><small>{record.area}</small><strong>{record.title}</strong><small>{record.status} →</small></Link>)}</div></section><Footer/></main>}

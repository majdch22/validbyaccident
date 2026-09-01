import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site-chrome';
import { researchRecords } from '@/lib/research-records';

export const metadata: Metadata = { title: 'Research index' };
const records = [
  { category:'WEB—FILESYSTEM', title:'The preview server was also a file server', published:'01 SEP 2026', href:'/research/preview-server-file-disclosure' },
  ...researchRecords.map(record=>({category:record.category,title:record.title,published:record.published,href:`/research/${record.slug}`})),
];

export default function Research(){return <main><Header/><section className="page-shell shell"><div className="page-title"><p className="eyebrow">Research index</p><h1>Published research.</h1></div><div className="index-list publication-list">{records.map(record=><a className="index-row publication-row" href={record.href} key={record.href}><small>{record.category}</small><strong>{record.title}</strong><time dateTime="2026-09-01">{record.published}</time></a>)}</div></section><Footer/></main>}

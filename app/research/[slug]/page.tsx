import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Header, Footer } from '@/components/site-chrome';
import { getResearchRecord, researchRecords } from '@/lib/research-records';

export function generateStaticParams() { return researchRecords.map(record => ({ slug: record.slug })); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const record=getResearchRecord(slug); if(!record)return {};
  return {title:record.title,description:record.deck,openGraph:{images:[]},twitter:{images:[]}};
}
export default async function ResearchArticle({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const record=getResearchRecord(slug); if(!record)notFound();
  return <main><Header/><article className="article-shell shell">
    <Link className="article-back" href="/research"><ArrowLeft size={14}/> Research index</Link>
    <header className="article-hero"><div className="article-kicker"><span>{record.category}</span><span>PUBLISHED {record.published}</span></div><h1>{record.title}</h1><p className="article-deck">{record.deck}</p><div className="article-facts article-facts-compact"><div><span>Category</span><strong>{record.category}</strong></div><div><span>Published</span><strong>{record.published}</strong></div><div><span>Status</span><strong>{record.status}</strong></div></div></header>
    <div className="article-layout"><aside className="article-rail"><span>{record.id}</span><p>{record.note}</p></aside><div className="article-body"><p className="article-opening">{record.opening}</p>{record.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.code&&<pre><code>{section.code}</code></pre>}</section>)}<div className="article-end"><span>End of record</span><Link href="/research">Return to the research index <ArrowUpRight size={15}/></Link></div></div></div>
  </article><Footer/></main>;
}

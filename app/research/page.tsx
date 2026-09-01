import type {Metadata} from 'next';
import Link from 'next/link';
import {Header,Footer} from '@/components/site-chrome';
export const metadata:Metadata={title:'Research index'};
const records=[['CR-001','Web','Cross-boundary messaging in embedded applications','Candidate'],['CR-002','Desktop','Parsing an untrusted project file','Under review'],['CR-003','Cloud','Authorization paths across shared resources','Draft'],['NOTE-01','Method','From suspicious behavior to defensible finding','Working note']];
export default function Research(){return <main><Header/><section className="page-shell shell"><div className="page-title"><p className="eyebrow">Research index</p><h1>Investigations, not claims.</h1><p className="lede">A public record of sanitized research. Status labels distinguish working hypotheses from validated and disclosed findings.</p></div><div className="index-list">{records.map((r,i)=><Link className="index-row" href={i===0?'/research/cross-boundary-messaging':'/method'} key={r[0]}><small>{r[0]}</small><small>{r[1]}</small><strong>{r[2]}</strong><small>{r[3]} →</small></Link>)}</div></section><Footer/></main>}

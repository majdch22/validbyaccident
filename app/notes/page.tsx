import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site-chrome';
export const metadata: Metadata = { title: 'Field notes' };
const notes=[
  {mark:'01',title:'The model is not the researcher.',body:'Artificial intelligence can hold more context, generate more variations, and notice repetition without getting tired. It still does not know when a product behavior is meaningful. I use the machine to widen the investigation; I keep responsibility for the conclusion.'},
  {mark:'02',title:'A duplicate is still a discovery.',body:'Being second changes the reward, not the technical work that led there. A duplicate can prove that the method works, reveal an incomplete fix, or reach the same root cause through a cleaner chain. I label it honestly and keep the useful part.'},
  {mark:'03',title:'Severity is not the story.',body:'A Low finding can contain a beautiful boundary failure. A Critical label can hide weak evidence. I care about the moment the system grants authority it should not grant—and whether another researcher can reproduce that moment.'},
  {mark:'04',title:'The interesting bugs live between features.',body:'A preview server, a source map, and a local file route may each look harmless in isolation. An iframe permission, a shared project, and an old browser grant may also look normal. Research begins when those pieces are tested as one system.'},
];
export default function Notes(){return <main><Header/><section className="page-shell shell"><div className="page-title"><p className="eyebrow">Field notes</p><h1>Positions from inside the work.</h1><p className="lede">Short thoughts on research, artificial intelligence, proof, duplicates, and the parts of security that do not fit inside a report template.</p></div><div className="notes-grid">{notes.map(note=><article className="note-card" key={note.mark}><span>{note.mark}</span><h2>{note.title}</h2><p>{note.body}</p></article>)}</div></section><Footer/></main>}

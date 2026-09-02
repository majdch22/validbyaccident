import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Field notes',
  description: 'Majd Chorfi on AI-assisted security research, validation, and building complete attack stories.',
};

const workingLoop = [
  { mark: '01', label: 'Expand', title: 'Do not stop at the first explanation.', body: 'I use AI to hold a wider model of the product: requests, client code, roles, state changes, and the assumptions connecting them. It helps me produce more hypotheses and revisit details that would be easy to discard too early. The point is not more output. It is a larger field of view.' },
  { mark: '02', label: 'Challenge', title: 'Make the finding argue for itself.', body: 'Once a path works, I ask the opposite questions. What else could explain the result? Which prerequisite is hidden? What would a skeptical triager challenge? AI is useful here as an adversarial second reader, but the answer must come from a repeatable test—not from the model sounding certain.' },
  { mark: '03', label: 'Connect', title: 'Follow behavior across boundaries.', body: 'The first visible bug is often only an entry point. I use the combined context to trace what it can reach across browser trust, authorization, tenant boundaries, identity flows, and backend state. That is how an odd response becomes a fuller analysis of who can do what, to whom, and with what consequence.' },
];

export default function Notes() {
  return <main><Header/><section className="page-shell shell notes-page">
    <div className="page-title notes-title"><p className="eyebrow">Field notes / AI-assisted research</p><h1>One researcher.<br/><i>A wider field of view.</i></h1><p className="lede">I work with AI as part of the research process—not as a shortcut around understanding the system, but as a way to examine more of it.</p></div>
    <section className="notes-position"><div className="position-index">00</div><div className="position-copy"><p className="eyebrow">My position</p><h2>AI changes how far one researcher can follow an idea.</h2><p>Security research is full of unfinished threads: a parameter that behaves differently, a permission checked in one flow but not another, a message crossing a boundary nobody questioned. AI gives me the capacity to keep more of those threads alive at once—to compare code and traffic, generate testable variations, reconstruct unfamiliar systems, and search for the next link in an attack chain.</p><p>But volume is not understanding. I decide which questions are worth asking, build the experiment, verify the behavior on systems I am authorized to test, and separate what I observed from what I only suspect. My goal is not to produce an AI-shaped report. It is to use AI well enough that the final analysis is broader, harder to dismiss, and more complete than either of us would reach alone.</p><blockquote>AI helps me avoid stopping too early. Evidence tells me when to stop.</blockquote></div></section>
    <div className="notes-loop-heading"><p className="eyebrow">The working loop</p><p>Three habits I bring to every investigation.</p></div>
    <div className="notes-grid notes-loop">{workingLoop.map(note => <article className="note-card" key={note.mark}><div className="note-meta"><span>{note.mark}</span><span>{note.label}</span></div><h2>{note.title}</h2><p>{note.body}</p></article>)}</div>
    <section className="human-line"><p className="eyebrow">What remains human</p><p>Curiosity chooses the anomaly. Judgment designs the proof. Restraint keeps the test safe. Accountability signs the report.</p></section>
  </section><Footer/></main>;
}

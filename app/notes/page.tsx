import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'Field notes',
  description: 'Majd Chorfi on AI-assisted security research, validation, and building complete attack stories.',
};

const workingLoop = [
  { mark: '01', label: 'Scouts', title: 'Send more eyes into the system.', body: 'Some agents map routes and roles. Some read JavaScript, compare requests, or reconstruct state changes. I give each one a narrow mission, then bring their observations together. What looks ordinary to one agent often becomes interesting when placed beside what another one found.' },
  { mark: '02', label: 'Opposition', title: 'Make the room disagree with me.', body: 'Agreement is cheap, so I assign agents to attack the finding itself. They search for hidden prerequisites, innocent explanations, broken assumptions, and the objections a skeptical triager may raise. Their job is not to confirm my idea. It is to make weak ideas die early and strong ones survive contact.' },
  { mark: '03', label: 'Strike team', title: 'Turn separate clues into one attack story.', body: 'A working payload is rarely the end. I redirect the agents toward every boundary it touches: browser trust, authorization, identity, tenant separation, and backend state. Together we follow the path outward until the real consequence is visible and the proof can stand on its own.' },
];

export default function Notes() {
  return <main><Header/><section className="page-shell shell notes-page">
    <div className="page-title notes-title"><p className="eyebrow">Field notes / Agent-led research</p><h1>I lead the investigation.<br/><i>The agents widen the front.</i></h1><p className="lede">My advantage is not simply having access to AI. It is knowing how to organize it: many focused agents, one research direction, and no claim accepted without proof.</p></div>
    <section className="notes-position"><div className="position-index">HQ</div><div className="position-copy"><p className="eyebrow">Inside the research room</p><h2>A small army that never gets tired of asking “what else?”</h2><p>When a product opens in front of me, I do not ask one model one large question. I divide the system into missions. Specialized agents study the client, trace requests, map permissions, compare flows, generate hypotheses, and keep watch over details that might otherwise disappear into the noise. They work at full force, in parallel, while I keep the complete investigation in view.</p><p>I am not outside the process waiting for an answer. I am in the middle of it—redirecting agents when a clue changes the map, combining results that were discovered separately, and bringing my own instinct to the moments that feel wrong before they can be fully explained. The agents multiply my reach; they do not replace my responsibility.</p><p>Every promising result comes back to me for contact with reality. I reproduce it, remove coincidence, test the boundary, control the scope, and decide what the evidence supports. This is where an army of fast ideas becomes one defensible piece of research.</p><blockquote>Many agents can search. One researcher must lead.</blockquote></div></section>
    <div className="notes-loop-heading"><p className="eyebrow">The formation</p><p>Different missions. One investigation.</p></div>
    <div className="notes-grid notes-loop">{workingLoop.map(note => <article className="note-card" key={note.mark}><div className="note-meta"><span>{note.mark}</span><span>{note.label}</span></div><h2>{note.title}</h2><p>{note.body}</p></article>)}</div>
    <section className="human-line"><p className="eyebrow">My command</p><p>The agents bring speed, memory, opposition, and range. I choose the battlefield, read the evidence, make the connections, and take responsibility for the report.</p></section>
  </section><Footer/></main>;
}

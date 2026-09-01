import Link from 'next/link';
export function Header(){return <header className="site-header shell"><Link className="brand" href="/"><span className="brand-mark">CR</span><span>Chorf Research Lab</span></Link><nav><Link href="/research">Research</Link><Link href="/method">Method</Link><Link href="/about">About</Link></nav></header>}
export function Footer(){return <footer className="site-footer shell"><span>Chorf Research Lab</span><span>Independent security research · Lagos</span><Link href="/about">Contact</Link></footer>}

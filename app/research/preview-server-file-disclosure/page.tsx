import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Footer, Header } from '@/components/site-chrome';

export const metadata: Metadata = {
  title: 'The preview server was also a file server',
  description: 'How one source map turned a public development preview into source-code and live-database disclosure.',
  openGraph: { images: [] },
  twitter: { images: [] },
};

const sourceResponse = `GET /src/main.jsx HTTP/1.1
Host: <preview-id>.<preview-domain>

HTTP/1.1 200 OK

"sources":["/home/<user>/websites/<project>/apps/web/src/main.jsx"]`;
const fileRead = `GET /@fs/home/<user>/websites/<project>/apps/web/src/pages/App.jsx HTTP/1.1
Host: <preview-id>.<preview-domain>

HTTP/1.1 200 OK
Access-Control-Allow-Origin: *`;
const databaseRead = `GET /@fs/home/<user>/websites/<project>/apps/pocketbase/pb_data/data.db HTTP/1.1
Host: <preview-id>.<preview-domain>

HTTP/1.1 200 OK
Access-Control-Allow-Origin: *

SQLite format 3`;

export default function PreviewServerDisclosure() {
  return <main><Header/><article className="article-shell shell">
    <Link className="article-back" href="/research"><ArrowLeft size={14}/> Research index</Link>
    <header className="article-hero">
      <div className="article-kicker"><span>WEB—FILESYSTEM</span><span>PUBLISHED 01 SEP 2026</span></div>
      <h1>The preview server was also a file server.</h1>
      <p className="article-deck">A source map exposed an absolute path. Vite turned that path into a source-code read. One directory change reached the project&apos;s live SQLite database.</p>
      <div className="article-facts article-facts-compact" aria-label="Publication details"><div><span>Category</span><strong>WEB—FILESYSTEM</strong></div><div><span>Published</span><strong>01 SEP 2026</strong></div><div><span>Status</span><strong>DUP</strong></div></div>
    </header>
    <div className="article-layout">
      <aside className="article-rail"><span>CASE 001</span><p>The affected company is intentionally unnamed. Paths, hostnames, identifiers, and customer data have been removed.</p></aside>
      <div className="article-body">
        <p className="article-opening">The preview looked ordinary: a React application running while the website builder generated and edited code behind it. The response headers and transformed modules looked less ordinary. They belonged to a development server that was reachable from the public internet.</p>
        <p>My first question was small: how much of the generated project was the preview willing to serve? I requested the application&apos;s main module directly. It returned the JavaScript without asking for a session, along with an inline source map.</p>
        <h2>The path hiding in the source map</h2>
        <p>The source map did more than make the generated code easier to debug. Its <code>sources</code> entry contained the absolute path used inside the preview container.</p>
        <pre><code>{sourceResponse}</code></pre>
        <p>That gave me two values I did not have before: the container&apos;s user directory and the project directory. An absolute path is usually only an information leak. Here it was also an input to a Vite feature.</p>
        <h2>A development convenience, exposed publicly</h2>
        <p>Vite&apos;s development server supports an <code>/@fs/</code> route for serving files by absolute path. It is useful during local development. It becomes a different feature when the development server sits on a public preview domain.</p>
        <p>I rebuilt the leaked path as an <code>/@fs/</code> request.</p>
        <pre><code>{fileRead}</code></pre>
        <p>The response was the raw component source. I sent no cookies and no authorization header. The server also returned a wildcard CORS header, so another website could read the response in a browser if it knew the preview identifier.</p>
        <div className="article-note"><span>Boundary crossed</span><p>A shareable application preview was expected to expose rendered output. It exposed the preview process&apos;s readable project files instead.</p></div>
        <h2>I expected source code. I did not expect the database.</h2>
        <p>At this point I had source disclosure, but I wanted to understand where the filesystem boundary ended. The generated project also used PocketBase. Its data directory sat beside the frontend inside the same project tree.</p>
        <p>Changing the path from a React component to PocketBase&apos;s database returned a SQLite file:</p>
        <pre><code>{databaseRead}</code></pre>
        <p>The file had been modified only minutes before I retrieved it. It was not a forgotten fixture or a cached example database; it was the database used by my active test project.</p>
        <p>That was the point where the finding changed. Source disclosure reveals how an application works. A live database can contain the application&apos;s records. I confirmed the file read using only data from my own controlled project and stopped there.</p>
        <h2>The boundary I demonstrated</h2>
        <p>An unauthenticated request, given an active preview identifier, could retrieve project source and the live SQLite database reachable by the preview process. The wildcard CORS response made both readable from an unrelated origin.</p>
        <p>The database contents naturally depended on the application using it; the security failure was that the entire live file crossed the project boundary without authentication. The demonstrated scope was every readable path Vite exposed inside the preview environment, including backend state—not a claim of container escape.</p>
        <p>There was another practical constraint: the attacker needed the preview UUID, and previews were most reliable while recently active. That limits opportunistic scanning, but it does not restore authorization. Preview URLs are routinely shared, logged, and opened by collaborators.</p>
        <h2>The report was a duplicate</h2>
        <p>The program confirmed that the issue had already been reported and that a fix was in progress. Mine was closed as a duplicate. That is still useful validation: another researcher had independently reached the same broken boundary before I did.</p>
        <p>The duplicate also changed how I think about preview environments. I used to treat source maps, development routes, and temporary containers as separate checks. They are better tested as a chain. A path leak that seems minor can become the map for a file-serving primitive one request later.</p>
        <h2>What I check now</h2>
        <ul><li>Whether a preview uses a production build or a development server.</li><li>Whether source maps disclose absolute container paths.</li><li>Whether development-only routes remain reachable without a session.</li><li>Whether the preview process can read backend state stored beside the frontend.</li><li>How preview identifiers are created, shared, logged, and expired.</li></ul>
        <p>None of those checks is especially clever on its own. The finding came from refusing to stop at the first interesting response.</p>
        <div className="article-end"><span>End of record</span><Link href="/research">Return to the research index <ArrowUpRight size={15}/></Link></div>
      </div>
    </div>
  </article><Footer/></main>;
}

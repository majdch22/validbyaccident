import type { Metadata } from 'next';
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
    <a className="article-back" href="/research"><ArrowLeft size={14}/> Research index</a>
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
        <h2>Why the development server changed the threat model</h2>
        <p>A production preview normally exposes compiled assets selected by the build. This preview exposed a running development server with knowledge of the project&apos;s source tree. The public host therefore inherited tools designed for a trusted workstation: transformed modules, inline source metadata, and absolute-path file serving.</p>
        <p>The source-map request and the <code>/@fs/</code> request were not separate bugs. The first disclosed the exact path syntax and directory layout required by the second. Once the project root was known, moving from the frontend into the adjacent PocketBase directory required no traversal bypass—only a readable path inside the development server&apos;s permitted scope.</p>
        <p>The wildcard CORS header made the exposure directly usable from another origin. A malicious page with a known preview identifier could fetch the file and read the response rather than relying on a blind request or asking a victim to download anything.</p>
        <h2>The boundary the fix had to restore</h2>
        <p>Protecting only the first source module would remove the easiest path leak while leaving the file-serving primitive. Blocking only the database path would leave the rest of the project readable. The preview needed a production-style asset boundary or an authenticated proxy that exposed only files intended for rendering.</p>
        <p>The report was a duplicate, and the program said a fix was already in progress. The complete technical chain remained clear: a public preview identifier selected a live container, its source map disclosed the internal layout, and its development file route returned both source code and backend state without authentication.</p>
        <div className="article-end"><span>End of record</span><a href="/research">Return to the research index <ArrowUpRight size={15}/></a></div>
      </div>
    </div>
  </article><Footer/></main>;
}

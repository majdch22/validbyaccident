import type {Metadata} from 'next';
import {Geist,Geist_Mono} from 'next/font/google';
import './globals.css';
const geist=Geist({variable:'--font-geist',subsets:['latin']});
const mono=Geist_Mono({variable:'--font-mono',subsets:['latin']});
export const metadata:Metadata={title:{default:'Chorf Research Lab',template:'%s — Chorf Research Lab'},description:'Independent vulnerability research across browser, cloud, and desktop attack surfaces.'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>}

import '../styles/globals.css';
import Head from 'next/head';
import Header from './components/Header'
import { Poppins } from 'next/font/google';
import { SessionProvider } from "next-auth/react"
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';

const inter = Poppins({
  subsets: ['latin'],
  weight: '400'
});

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Ecommerce-admin</title> {/* Set the default title */}
        {/* <link rel="icon" href="/favicon.ico" /> Link to your favicon */}
        <meta name="description" content="Welcome to our Ecommerce site!" /> {/* Optional meta description */}
      </Head>
      <main className={`mx-auto max-w-screen-7xl px-4 sm:px-6 lg:px-8${inter.className}`}>
        <Header />
        <div className="min-h-screen max-w-screen-2xl mx-auto">
          <Component {...pageProps} />
          <Toaster position='top-center'  />
        </div>
        <Footer />
      </main>
    </SessionProvider>
  )
}
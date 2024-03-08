import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';
import type { AppProps } from 'next/app';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/_header';
//import { server } from '../mocks/server';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  // if (process.env.NODE_ENV === 'development') {
  //   server.listen();
  // }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={['point', 'dark', 'normal']}
      disableTransitionOnChange>
      <div className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Header />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

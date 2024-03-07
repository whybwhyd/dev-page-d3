import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/_header';

export default function App({ Component, pageProps }: AppProps) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'undefined') {
      (async () => {
        const { server } = await import('../mocks/server');
        server.listen();
      })();
    } else {
      (async () => {
        const { worker } = await import('../mocks/browser');
        worker.start();
      })();
    }
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={['point', 'dark', 'normal']}
      disableTransitionOnChange>
      <div className={'min-h-screen'}>
        <Header />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// react
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// react helmet
import { HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App';

// i18n
import './locales/i18n';
// tailwind css
import './theme/index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Number of retries on failure
      gcTime: 300_000, // Cache expiration time 5m
      staleTime: 10_1000, // Time for data to become "stale" 10s
      refetchOnWindowFocus: false, // Disable refetching data on window focus
      refetchOnReconnect: false, // Disable refetching data on reconnect
      refetchOnMount: false, // Disable refetching data on component mount
    },
  },
});
if (!window.location.hash) {
  const path = window.location.pathname + window.location.search;
  window.location.replace(`${window.location.origin}/#${path}`);
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense>
        <Analytics />
        <App />
      </Suspense>
    </QueryClientProvider>
  </HelmetProvider>,
);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './ErrorBoundary';
import { Router } from './Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

export const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { LanguageProvider } from '@/lib/LanguageContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

interface ProvidersProps {
  children: React.ReactNode;
}

function AllProviders({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react';

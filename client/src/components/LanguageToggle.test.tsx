import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../../test/utils/renderWithProviders';
import LanguageToggle from './LanguageToggle';

describe('LanguageToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays current language code opposite (EN when es, ES when en)', () => {
    renderWithProviders(<LanguageToggle />);

    const button = screen.getByTestId('button-language-toggle');

    // Default is English, so button should show "ES"
    expect(button).toHaveTextContent('ES');
  });

  it('toggles language from English to Spanish on click', () => {
    renderWithProviders(<LanguageToggle />);

    const button = screen.getByTestId('button-language-toggle');

    // Initially showing "ES" (current is EN)
    expect(button).toHaveTextContent('ES');

    // Click to switch to Spanish
    fireEvent.click(button);

    // Now should show "EN" (current is ES)
    expect(button).toHaveTextContent('EN');
  });

  it('toggles language from Spanish to English on click', () => {
    localStorage.setItem('language', 'es');
    renderWithProviders(<LanguageToggle />);

    const button = screen.getByTestId('button-language-toggle');

    // Initially showing "EN" (current is ES)
    expect(button).toHaveTextContent('EN');

    // Click to switch to English
    fireEvent.click(button);

    // Now should show "ES" (current is EN)
    expect(button).toHaveTextContent('ES');
  });

  it('has correct aria-label for accessibility', () => {
    renderWithProviders(<LanguageToggle />);

    const button = screen.getByTestId('button-language-toggle');

    // When language is English, aria-label should suggest switching to Spanish
    expect(button).toHaveAttribute('aria-label', 'Switch to Spanish');

    // Click to switch
    fireEvent.click(button);

    // When language is Spanish, aria-label should suggest switching to English
    expect(button).toHaveAttribute('aria-label', 'Switch to English');
  });

  it('applies light variant styles correctly', () => {
    renderWithProviders(<LanguageToggle variant="light" />);

    const button = screen.getByTestId('button-language-toggle');

    expect(button).toHaveClass('text-white/80');
    expect(button).toHaveClass('hover:text-white');
    expect(button).toHaveClass('hover:bg-white/10');
  });

  it('does not apply light variant styles when variant is dark', () => {
    renderWithProviders(<LanguageToggle variant="dark" />);

    const button = screen.getByTestId('button-language-toggle');

    expect(button).not.toHaveClass('text-white/80');
    expect(button).not.toHaveClass('hover:text-white');
    expect(button).not.toHaveClass('hover:bg-white/10');
  });

  it('uses dark variant by default when no variant prop is provided', () => {
    renderWithProviders(<LanguageToggle />);

    const button = screen.getByTestId('button-language-toggle');

    // Should not have light variant classes
    expect(button).not.toHaveClass('text-white/80');
  });

  it('persists language change to localStorage', () => {
    renderWithProviders(<LanguageToggle />);

    const button = screen.getByTestId('button-language-toggle');

    // Click to switch to Spanish
    fireEvent.click(button);

    // Should be persisted
    expect(localStorage.getItem('language')).toBe('es');

    // Click again to switch back to English
    fireEvent.click(button);

    expect(localStorage.getItem('language')).toBe('en');
  });
});

/**
 * Integration Test: Accessibility ↔ i18n Integration
 * Tests that language changes propagate correctly through the app
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Accessibility from '../../src/components/Accessibility';

// Mock i18next
const mockChangeLanguage = vi.fn();
vi.mock('i18next', () => ({
    default: {
        changeLanguage: (...args) => mockChangeLanguage(...args),
    },
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                accessibility: 'Accessibility',
                text_size: 'Text Size',
                adjust_readability: 'Adjust for better readability',
                dark_light: 'Dark/Light Mode',
                better_visibility: 'Better visibility',
                switch_to_dark: 'Dark',
                switch_to_light: 'Light',
                language: 'Language',
                choose_language: 'Choose your language',
                voice_assist: 'Voice Assistance',
                voice_demo: 'Enable voice navigation',
                on: 'ON',
                off: 'OFF',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Integration: Accessibility ↔ i18n', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.style.fontSize = '';
    });

    describe('Accessibility Component', () => {
        it('renders accessibility button', () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('opens drawer on button click', async () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            expect(screen.getByText('Accessibility')).toBeInTheDocument();
            expect(screen.getByText('Text Size')).toBeInTheDocument();
            expect(screen.getByText('Language')).toBeInTheDocument();
        });

        it('changes language and updates i18n', async () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            // Open drawer
            const button = screen.getByRole('button');
            await userEvent.click(button);

            // Find language select and change it
            const languageSelect = screen.getByRole('combobox');
            await userEvent.selectOptions(languageSelect, 'hi');

            expect(mockChangeLanguage).toHaveBeenCalledWith('hi');
            expect(localStorage.getItem('lang')).toBe('hi');
        });

        it('persists language selection in localStorage', async () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            const languageSelect = screen.getByRole('combobox');
            await userEvent.selectOptions(languageSelect, 'ta');

            expect(localStorage.getItem('lang')).toBe('ta');
        });
    });

    describe('Theme Integration', () => {
        it('toggles theme and updates DOM', async () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            const themeButton = screen.getByText('Dark');
            await userEvent.click(themeButton);

            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
            expect(localStorage.getItem('theme')).toBe('dark');
        });

        it('toggles back to light theme', async () => {
            localStorage.setItem('theme', 'dark');

            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            const themeButton = screen.getByText('Light');
            await userEvent.click(themeButton);

            expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        });
    });

    describe('Text Size Integration', () => {
        it('increases text size on A+ click', async () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            const increaseButton = screen.getByText('A+');
            await userEvent.click(increaseButton);

            expect(document.documentElement.style.fontSize).toBe('17.6px');
        });

        it('decreases text size on A- click', async () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            const decreaseButton = screen.getByText('A-');
            await userEvent.click(decreaseButton);

            expect(document.documentElement.style.fontSize).toBe('14.4px');
        });

        it('resets text size on A click', async () => {
            localStorage.setItem('textScale', '1.2');

            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            const resetButton = screen.getByText('A');
            await userEvent.click(resetButton);

            expect(document.documentElement.style.fontSize).toBe('16px');
        });
    });

    describe('Voice Assistance Toggle', () => {
        it('toggles voice assistance and persists to localStorage', async () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            const voiceButton = screen.getByText('OFF');
            await userEvent.click(voiceButton);

            expect(localStorage.getItem('voiceOn')).toBe('true');
        });
    });

    describe('Keyboard Navigation', () => {
        it('closes drawer on Escape key', async () => {
            render(
                <BrowserRouter>
                    <Accessibility />
                </BrowserRouter>
            );

            const button = screen.getByRole('button');
            await userEvent.click(button);

            expect(screen.getByText('Accessibility')).toBeInTheDocument();

            fireEvent.keyDown(window, { key: 'Escape' });

            await waitFor(() => {
                const drawer = document.querySelector('.acc-drawer');
                expect(drawer).not.toHaveClass('open');
            });
        });
    });
});

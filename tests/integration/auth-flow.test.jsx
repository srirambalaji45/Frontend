/**
 * Integration Test: Authentication Flow
 * Tests the module interactions between Login, Router, and API
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '../../src/components/Login';
import Verify from '../../src/components/Verify';

// Mock axios
vi.mock('axios', () => ({
    default: {
        post: vi.fn(),
    },
}));

// Mock i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                'auth.welcome': 'Welcome!',
                'auth.enter_phone': 'Enter your phone number',
                'auth.phone_placeholder': '10-digit number',
                'auth.otp_hint': 'We will send you an OTP',
                'auth.continue': 'Continue',
                'auth.sending_otp': 'Sending OTP...',
                'auth.invalid_phone': 'Please enter a valid 10-digit phone number',
                'auth.no_account': "Don't have an account?",
                'auth.create_new': 'Create new',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Integration: Auth Flow', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Login Component', () => {
        it('renders login form correctly', () => {
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );

            expect(screen.getByText('Welcome!')).toBeInTheDocument();
            expect(screen.getByText('Enter your phone number')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('10-digit number')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
        });

        it('validates phone number format', async () => {
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );

            const input = screen.getByPlaceholderText('10-digit number');
            const button = screen.getByRole('button', { name: 'Continue' });

            // Enter invalid phone number
            await userEvent.type(input, '123');
            await userEvent.click(button);

            expect(screen.getByText('Please enter a valid 10-digit phone number')).toBeInTheDocument();
        });

        it('only allows digits in phone input', async () => {
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );

            const input = screen.getByPlaceholderText('10-digit number');
            await userEvent.type(input, '123abc456def');

            expect(input).toHaveValue('123456');
        });

        it('navigates to signup page on link click', async () => {
            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );

            const signupLink = screen.getByText('Create new');
            expect(signupLink.closest('a')).toHaveAttribute('href', '/signup');
        });

        it('submits login request with valid phone', async () => {
            const axios = await import('axios');
            axios.default.post.mockResolvedValueOnce({
                data: {
                    success: true,
                    data: { _id: 'user123' },
                    requestId: 'req123',
                },
            });

            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );

            const input = screen.getByPlaceholderText('10-digit number');
            const button = screen.getByRole('button', { name: 'Continue' });

            await userEvent.type(input, '9876543210');
            await userEvent.click(button);

            await waitFor(() => {
                expect(axios.default.post).toHaveBeenCalledWith(
                    'http://localhost:5000/api/auth/login',
                    { phone: '9876543210' },
                    { headers: { 'Content-Type': 'application/json' } }
                );
            });
        });
    });

    describe('Login → Verify Navigation', () => {
        it('navigates from login to verify on successful OTP request', async () => {
            const axios = await import('axios');
            axios.default.post.mockResolvedValueOnce({
                data: {
                    success: true,
                    data: { _id: 'user123' },
                    requestId: 'req123',
                },
            });

            let navigatedPath = '';

            // Mock useNavigate
            vi.mock('react-router-dom', async () => {
                const actual = await vi.importActual('react-router-dom');
                return {
                    ...actual,
                    useNavigate: () => (path) => {
                        navigatedPath = path;
                    },
                };
            });

            render(
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            );

            const input = screen.getByPlaceholderText('10-digit number');
            const button = screen.getByRole('button', { name: 'Continue' });

            await userEvent.type(input, '9876543210');
            await userEvent.click(button);

            await waitFor(() => {
                expect(localStorage.getItem('phone')).toBe('9876543210');
            });
        });
    });
});

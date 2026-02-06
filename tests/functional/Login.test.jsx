/**
 * Functional Test: Login Component
 * Unit-level functional tests for Login component
 * 
 * Test Case Results:
 * | Input | Expected Output | Status |
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

// Mock axios
vi.mock('axios', () => ({
    default: {
        post: vi.fn(),
    },
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                'auth.welcome': 'Welcome!',
                'auth.enter_phone': 'Enter phone number',
                'auth.phone_placeholder': 'Enter 10-digit number',
                'auth.otp_hint': 'OTP will be sent',
                'auth.continue': 'Continue',
                'auth.sending_otp': 'Sending...',
                'auth.invalid_phone': 'Invalid phone number',
                'auth.no_account': 'No account?',
                'auth.create_new': 'Create new',
                'auth.otp_send_failed': 'Failed to send OTP',
                'auth.login_failed': 'Login failed',
            };
            return map[key] || key;
        },
    }),
}));

import Login from '../../src/components/Login';

describe('Functional: Login Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test Case: Phone validation - empty input
     * Input: "" (empty)
     * Expected: Error message shown
     */
    it('TC001: shows error for empty phone submission', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

        expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
    });

    /**
     * Test Case: Phone validation - short number
     * Input: "123" (3 digits)
     * Expected: Error message shown
     */
    it('TC002: shows error for phone number less than 10 digits', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await userEvent.type(screen.getByPlaceholderText('Enter 10-digit number'), '123');
        await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

        expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
    });

    /**
     * Test Case: Phone validation - exactly 10 digits
     * Input: "9876543210"
     * Expected: API call made, no validation error
     */
    it('TC003: accepts exactly 10 digit phone number', async () => {
        const axios = await import('axios');
        axios.default.post.mockResolvedValueOnce({
            data: { success: true, data: { _id: 'test' } },
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await userEvent.type(screen.getByPlaceholderText('Enter 10-digit number'), '9876543210');
        await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

        expect(axios.default.post).toHaveBeenCalled();
    });

    /**
     * Test Case: Phone validation - non-numeric characters
     * Input: "abc1234567"
     * Expected: Only numeric chars accepted, result "1234567"
     */
    it('TC004: filters non-numeric characters from input', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText('Enter 10-digit number');
        await userEvent.type(input, '123a456b789c0');

        expect(input).toHaveValue('1234567890');
    });

    /**
     * Test Case: API error handling
     * Input: Valid phone, API returns error
     * Expected: Error message displayed
     */
    it('TC005: displays API error message', async () => {
        const axios = await import('axios');
        axios.default.post.mockRejectedValueOnce({
            response: { data: { message: 'User not found' } },
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await userEvent.type(screen.getByPlaceholderText('Enter 10-digit number'), '9876543210');
        await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

        expect(await screen.findByText('User not found')).toBeInTheDocument();
    });

    /**
     * Test Case: Loading state during API call
     * Input: Valid phone, API is pending
     * Expected: Button disabled with loading text
     */
    it('TC006: shows loading state during submission', async () => {
        const axios = await import('axios');
        axios.default.post.mockImplementation(
            () => new Promise((resolve) => setTimeout(resolve, 1000))
        );

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        await userEvent.type(screen.getByPlaceholderText('Enter 10-digit number'), '9876543210');
        await userEvent.click(screen.getByRole('button', { name: 'Continue' }));

        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByRole('button')).toHaveTextContent('Sending...');
    });

    /**
     * Test Case: Country code display
     * Input: None
     * Expected: +91 country code visible
     */
    it('TC007: displays +91 country code', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByText('+91')).toBeInTheDocument();
    });

    /**
     * Test Case: Max length enforcement
     * Input: "12345678901234" (14 digits)
     * Expected: Only first 10 digits accepted
     */
    it('TC008: enforces 10 digit maximum', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText('Enter 10-digit number');
        await userEvent.type(input, '12345678901234');

        expect(input).toHaveValue('1234567890');
    });
});

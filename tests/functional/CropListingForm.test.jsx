/**
 * Functional Test: CropListingForm Component
 * 
 * Test Case Results:
 * | Test Case | Input | Expected Output | Status |
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

// Mock react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                'listing.add_crop_listings': 'Add Crop Listing',
                'listing.select_category': 'Select Category',
                'listing.select_crop': 'Select Crop',
                'listing.quantity': 'Quantity (kg)',
                'listing.price': 'Price (₹/kg)',
                'listing.add': 'Add Listing',
            };
            return map[key] || key;
        },
    }),
}));

import CropListingForm from '../../src/components/CropListingForm';

describe('Functional: CropListingForm Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test Case: Component renders correctly
     * Input: None
     * Expected: All form elements visible
     */
    it('TC001: renders form with all required elements', () => {
        render(
            <BrowserRouter>
                <CropListingForm />
            </BrowserRouter>
        );

        expect(screen.getByText('Add Crop Listing')).toBeInTheDocument();
        expect(screen.getByText('Select Category')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Quantity (kg)')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Price (₹/kg)')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add Listing' })).toBeInTheDocument();
    });

    /**
     * Test Case: Category selection enables crop dropdown
     * Input: Select "Food Grains / Cereals"
     * Expected: Crop dropdown enabled with grain options
     */
    it('TC002: enables crop dropdown after category selection', async () => {
        render(
            <BrowserRouter>
                <CropListingForm />
            </BrowserRouter>
        );

        // Initially crop select should be disabled
        const cropSelect = screen.getAllByRole('combobox')[1];
        expect(cropSelect).toBeDisabled();

        // Select category
        const categorySelect = screen.getAllByRole('combobox')[0];
        await userEvent.selectOptions(categorySelect, 'Food Grains / Cereals');

        // Crop select should now be enabled
        expect(cropSelect).not.toBeDisabled();
    });

    /**
     * Test Case: Category change resets crop selection
     * Input: Change category after selecting crop
     * Expected: Crop selection reset to empty
     */
    it('TC003: resets crop selection when category changes', async () => {
        render(
            <BrowserRouter>
                <CropListingForm />
            </BrowserRouter>
        );

        const categorySelect = screen.getAllByRole('combobox')[0];
        const cropSelect = screen.getAllByRole('combobox')[1];

        // Select category and crop
        await userEvent.selectOptions(categorySelect, 'Fruits');
        await userEvent.selectOptions(cropSelect, 'Mango');

        expect(cropSelect).toHaveValue('Mango');

        // Change category
        await userEvent.selectOptions(categorySelect, 'Vegetables');

        // Crop should be reset
        expect(cropSelect).toHaveValue('');
    });

    /**
     * Test Case: Crop options match category
     * Input: Select "Fruits" category
     * Expected: Fruit options shown (Mango, Apple, Banana, etc.)
     */
    it('TC004: shows correct crops for selected category', async () => {
        render(
            <BrowserRouter>
                <CropListingForm />
            </BrowserRouter>
        );

        const categorySelect = screen.getAllByRole('combobox')[0];
        await userEvent.selectOptions(categorySelect, 'Fruits');

        const cropSelect = screen.getAllByRole('combobox')[1];
        const options = Array.from(cropSelect.options).map((opt) => opt.value);

        expect(options).toContain('Mango');
        expect(options).toContain('Apple');
        expect(options).toContain('Banana');
        expect(options).not.toContain('Tomato'); // Vegetable
        expect(options).not.toContain('Wheat'); // Cereal
    });

    /**
     * Test Case: Quantity input accepts only numbers
     * Input: Type "abc123"
     * Expected: Only "123" in input (HTML5 number input)
     */
    it('TC005: quantity input has number type', () => {
        render(
            <BrowserRouter>
                <CropListingForm />
            </BrowserRouter>
        );

        const quantityInput = screen.getByPlaceholderText('Quantity (kg)');
        expect(quantityInput).toHaveAttribute('type', 'number');
    });

    /**
     * Test Case: Price input accepts only numbers
     * Input: Price field
     * Expected: Number type input
     */
    it('TC006: price input has number type', () => {
        render(
            <BrowserRouter>
                <CropListingForm />
            </BrowserRouter>
        );

        const priceInput = screen.getByPlaceholderText('Price (₹/kg)');
        expect(priceInput).toHaveAttribute('type', 'number');
    });

    /**
     * Test Case: Form submission resets all fields
     * Input: Fill all fields and submit
     * Expected: All fields reset to empty
     */
    it('TC007: clears form after successful submission', async () => {
        // Mock console.log to verify submission
        const consoleSpy = vi.spyOn(console, 'log');

        render(
            <BrowserRouter>
                <CropListingForm />
            </BrowserRouter>
        );

        const categorySelect = screen.getAllByRole('combobox')[0];
        const cropSelect = screen.getAllByRole('combobox')[1];
        const quantityInput = screen.getByPlaceholderText('Quantity (kg)');
        const priceInput = screen.getByPlaceholderText('Price (₹/kg)');
        const submitButton = screen.getByRole('button', { name: 'Add Listing' });

        // Fill form
        await userEvent.selectOptions(categorySelect, 'Vegetables');
        await userEvent.selectOptions(cropSelect, 'Tomato');
        await userEvent.type(quantityInput, '100');
        await userEvent.type(priceInput, '50');

        // Submit
        await userEvent.click(submitButton);

        // Verify console.log was called with form data
        expect(consoleSpy).toHaveBeenCalledWith({
            category: 'Vegetables',
            crop: 'Tomato',
            quantity: '100',
            price: '50',
        });

        // Verify fields are cleared
        expect(categorySelect).toHaveValue('');
        expect(quantityInput).toHaveValue(null);
        expect(priceInput).toHaveValue(null);

        consoleSpy.mockRestore();
    });

    /**
     * Test Case: All categories available
     * Input: None
     * Expected: 5 categories available
     */
    it('TC008: displays all crop categories', () => {
        render(
            <BrowserRouter>
                <CropListingForm />
            </BrowserRouter>
        );

        const categorySelect = screen.getAllByRole('combobox')[0];
        const options = Array.from(categorySelect.options).map((opt) => opt.value);

        expect(options).toContain('Food Grains / Cereals');
        expect(options).toContain('Oilseeds');
        expect(options).toContain('Fruits');
        expect(options).toContain('Vegetables');
        expect(options).toContain('Spices');
    });
});

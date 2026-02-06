import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn((key) => localStorageMock.store[key] || null),
    setItem: vi.fn((key, value) => {
        localStorageMock.store[key] = value;
    }),
    removeItem: vi.fn((key) => {
        delete localStorageMock.store[key];
    }),
    clear: vi.fn(() => {
        localStorageMock.store = {};
    }),
    store: {},
};

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock SpeechRecognition for VoiceNav tests
const mockSpeechRecognition = vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    stop: vi.fn(),
    abort: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    onstart: null,
    onend: null,
    onerror: null,
    onresult: null,
    continuous: false,
    interimResults: false,
    lang: '',
}));

window.SpeechRecognition = mockSpeechRecognition;
window.webkitSpeechRecognition = mockSpeechRecognition;

// Mock matchMedia
window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}));

// Mock IntersectionObserver
window.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Reset mocks between tests
afterEach(() => {
    vi.clearAllMocks();
    localStorageMock.store = {};
});

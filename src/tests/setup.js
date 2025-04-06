import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Mock global objects
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock Headers, Request, Response for fetch API
class MockHeaders {
  constructor(init) {
    this._headers = new Map();
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this._headers.set(key.toLowerCase(), value);
      });
    }
  }
  
  append(key, value) {
    this._headers.set(key.toLowerCase(), value);
  }
  
  get(key) {
    return this._headers.get(key.toLowerCase()) || null;
  }
}

class MockRequest {
  constructor(input, init = {}) {
    this.url = input;
    this.method = init.method || 'GET';
    this.headers = new MockHeaders(init.headers);
    this.body = init.body;
  }
}

class MockResponse {
  constructor(body, init = {}) {
    this._body = body;
    this.status = init.status || 200;
    this.statusText = init.statusText || '';
    this.headers = new MockHeaders(init.headers);
  }

  async json() {
    return JSON.parse(this._body);
  }
}

global.Headers = MockHeaders;
global.Request = MockRequest;
global.Response = MockResponse;

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
    query: {},
  }),
}));

// Mock next/server
jest.mock('next/server', () => {
  const mockRequest = class extends MockRequest {};
  const mockResponse = class extends MockResponse {
    static json(body) {
      return new MockResponse(JSON.stringify(body));
    }
  };
  return {
    NextRequest: mockRequest,
    NextResponse: mockResponse,
  };
});

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
      },
      expires: '2024-12-31',
    },
    status: 'authenticated',
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock Material-UI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: () => ({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
    spacing: (factor) => factor * 8,
  }),
}));

// Mock mongoose
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
  },
  Schema: jest.fn().mockReturnValue({
    index: jest.fn(),
  }),
  model: jest.fn(),
  models: {},
})); 
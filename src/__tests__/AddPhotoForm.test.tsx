import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import AddPhotoForm from '../components/AddPhoto/AddPhotoForm';
import axios from 'axios';

jest.mock('axios', () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: {} })),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockResponseData = jest.fn((payload) => {
  return {
    data: {
      results: {
        payload,
      },
    },
  };
});

describe('AddPhotoForm', () => {
  test('should return photos', async () => {
    const mockSaveSearchResults = jest.fn();
    const handleSetTerm = jest.fn();
    render(
      <AddPhotoForm
        handleSetTerm={handleSetTerm}
        term="water"
        saveSearchResults={mockSaveSearchResults}
      />
    );

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form', { name: /form/i });

    await user.type(input, 'water');
    expect(input).toHaveValue('water');

    const photos = [
      {
        id: 1,
        alt_description: 'photo 1',
        links: { self: 'https://test.com', html: 'https://test.com' },
        urls: {
          full: 'https://test.com',
          regular: 'https://test.com',
          small: 'https://test.com',
          thumb: 'https://test.com',
        },
      },
      {
        id: 2,
        alt_description: 'photo 2',
        links: { self: 'https://test.com', html: 'https://test.com' },
        urls: {
          full: 'https://test.com',
          regular: 'https://test.com',
          small: 'https://test.com',
          thumb: 'https://test.com',
        },
      },
    ];

    fireEvent.submit(form);

    const results = mockResponseData(photos);
    (axios.get as jest.Mock).mockImplementationOnce(() => {
      return Promise.resolve(results);
    });

    expect(axios.get).toHaveBeenCalled();
    waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  test('renders an input, a button, and a heading', () => {
    const mockSaveSearchResults = jest.fn();
    const handleSetTerm = jest.fn();
    render(
      <AddPhotoForm
        handleSetTerm={handleSetTerm}
        term="water"
        saveSearchResults={mockSaveSearchResults}
      />
    );

    const heading = screen.getByRole('heading', { name: /search photos/i });
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('shows an error when the user does not type anything', async () => {
    const mockSaveSearchResults = jest.fn();
    const handleSetTerm = jest.fn();
    render(
      <AddPhotoForm
        handleSetTerm={handleSetTerm}
        term=""
        saveSearchResults={mockSaveSearchResults}
      />
    );

    const form = screen.getByRole('form', { name: /form/i });

    fireEvent.submit(form);

    expect(
      screen.getByText(/please provide a term to search for\./i)
    ).toBeInTheDocument();
  });
});

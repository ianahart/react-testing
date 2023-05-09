import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import PhotoList from '../components/PhotoList';
import axios from 'axios';
import { getPhotos } from '../utils/api';
jest.mock('axios');

const renderComponent = () => {
  const term = 'water';
  const searchResults = [
    {
      id: '1',
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
      id: '2',
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
  const mockSaveSearchResults = jest.fn();
  const mockRemoveSearchResult = jest.fn();
  render(
    <PhotoList
      searchResults={searchResults}
      saveSearchResults={mockSaveSearchResults}
      removeSearchResult={mockRemoveSearchResult}
      term={term}
    />
  );
  return { searchResults, term };
};

test('should render a heading element on the screen', () => {
  renderComponent();

  const heading = screen.getByRole('heading', { name: /search results/i });
  expect(heading).toBeInTheDocument();
});

test('should render a next pagination button on the screen', async () => {
  renderComponent();
  const nextButton = screen.getByRole('button', { name: /next/i });
  expect(nextButton).toBeInTheDocument();
});

test('when next button is clicked should render a previous button on screen', async () => {
  renderComponent();
  const nextButton = screen.getByRole('button', { name: /next/i });

  await user.click(nextButton);

  const prevButton = screen.getByRole('button', { name: /prev/i });
  const pageNumber = screen.getByLabelText('page number');

  expect(pageNumber).toHaveTextContent('2');
  expect(prevButton).toBeInTheDocument();
});

test('when prev button is clicked the page number should decrease by one', async () => {
  renderComponent();
  const nextButton = screen.getByRole('button', { name: /next/i });

  await user.click(nextButton);

  const prevButton = screen.getByRole('button', { name: /prev/i });
  await user.click(prevButton);
  const pageNumber = screen.getByLabelText('page number');

  expect(pageNumber).toHaveTextContent('1');
});

test('when next button is clicked it should render new photos', async () => {
  renderComponent();

  const nextButton = screen.getByRole('button', { name: /next/i });
  await user.click(nextButton);
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const results = [
    {
      id: '3',
      alt_description: 'photo 3',
      links: { self: 'https://test.com', html: 'https://test.com' },
      urls: {
        full: 'https://test.com',
        regular: 'https://test.com',
        small: 'https://test.com',
        thumb: 'https://test.com',
      },
    },
  ];

  const mAxiosResponse = { data: { data: { results, error: null } }, error: null };

  const mockedGet = mockedAxios.get.mockReturnValueOnce(mAxiosResponse as any);
  const { data, error } = await getPhotos('water', 2);
  expect(axios.get).toHaveBeenCalled();
  expect(data).toEqual(mAxiosResponse);
});

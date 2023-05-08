import { render, screen } from '@testing-library/react';
import Photos from '../components/PhotoList/Photos';

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
  render(<Photos searchResults={searchResults} />);
  return { searchResults, term };
};

test('should render two photos on the screen', () => {
  renderComponent();

  const photos = screen.getAllByRole('img');

  photos.forEach((photo, index) => {
    expect(photo).toHaveAttribute('alt', `photo ${index + 1}`);
  });

  expect(photos).toHaveLength(2);
});

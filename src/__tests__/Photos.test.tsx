import { render, screen, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import Photos from '../components/PhotoList/Photos';
import { Context } from '../context/context';
import { IPhoto } from '../interfaces';
import { mockStore } from '../utils/mockStore';

beforeEach(() => {
  jest.clearAllMocks();
});

const returnProps = () => {
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
        small: 'https://test.com',
      },
    },
  ];
  return { searchResults, term };
};

describe('Photos', () => {
  test('should render two photos on the screen', () => {
    const { searchResults, term } = returnProps();
    const mockRemoveSearchResult = jest.fn();
    render(
      <Photos
        action="add"
        data={searchResults}
        removeSearchResult={mockRemoveSearchResult}
      />
    );

    const photos = screen.getAllByRole('img');

    photos.forEach((photo, index) => {
      expect(photo).toHaveAttribute('alt', `photo ${index + 1}`);
    });

    expect(photos).toHaveLength(2);
  });

  test('should add a photo to the users photos', async () => {
    const { searchResults, term } = returnProps();
    const mockRemoveSearchResult = jest.fn();

    render(
      <Context.Provider value={mockStore}>
        <Photos
          action="add"
          data={searchResults}
          removeSearchResult={mockRemoveSearchResult}
        />
      </Context.Provider>
    );

    const myPhotos = screen.getAllByLabelText('photo');
    const firstPhoto = within(myPhotos[0]).getByAltText('photo 1');
    await user.hover(firstPhoto);
    const button = screen.getByRole('button', { name: /click to add/i });

    await user.click(button);

    expect(mockStore.addPhoto).toHaveBeenCalled();
    expect(mockStore.addPhoto).toHaveBeenCalledWith({
      id: '1',
      alt_description: 'photo 1',
      urls: { small: 'https://test.com' },
    });
  });

  test('should remove search result when it is added as a photo', async () => {
    const { searchResults, term } = returnProps();
    const mockRemoveSearchResult = jest.fn();

    render(
      <Context.Provider value={mockStore}>
        <Photos
          action="add"
          data={searchResults}
          removeSearchResult={mockRemoveSearchResult}
        />
      </Context.Provider>
    );

    const myPhotos = screen.getAllByLabelText('photo');
    const firstPhoto = within(myPhotos[0]).getByAltText('photo 1');
    await user.hover(firstPhoto);
    const button = screen.getByRole('button', { name: /click to add/i });

    await user.click(button);

    expect(mockRemoveSearchResult).toHaveBeenCalled();
    expect(mockRemoveSearchResult).toHaveBeenCalledWith('1');
  });

  test("should remove photo from user's photo in context", async () => {
    const { searchResults } = returnProps();
    const mockRemoveSearchResult = jest.fn();

    render(
      <Context.Provider value={mockStore}>
        <Photos
          action="remove"
          data={searchResults}
          removeSearchResult={mockRemoveSearchResult}
        />
      </Context.Provider>
    );

    const myPhotos = screen.getAllByLabelText('photo');
    const firstPhoto = within(myPhotos[0]).getByAltText('photo 1');
    await user.hover(firstPhoto);
    const button = screen.getByRole('button', { name: /click to remove/i });

    await user.click(button);

    expect(mockStore.deletePhoto).toHaveBeenCalled();
    expect(mockStore.deletePhoto).toHaveBeenCalledWith('1');
  });
});

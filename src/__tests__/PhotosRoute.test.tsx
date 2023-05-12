import { findByRole, render, screen, waitFor } from '@testing-library/react';
import { IPhoto } from '../interfaces';
import ContextProvider, { Context } from '../context/context';
import user from '@testing-library/user-event';
import PhotosRoute from '../routes/PhotosRoute';

const returnSliceOfPhotos = () => {
  let slice: IPhoto[] = [
    { id: '1', urls: { small: 'https://test.com/1' }, alt_description: 'some photo 1' },
    {
      id: '2',
      urls: { small: 'https://www.test.com/2' },
      alt_description: 'some photo 2',
    },
    {
      id: '3',
      urls: { small: 'https://www.test.com/3' },
      alt_description: 'some photo 3',
    },
    {
      id: '4',
      urls: { small: 'https://www.test.com/4' },
      alt_description: 'some photo 4',
    },
    {
      id: '5',
      urls: { small: 'https://www.test.com/5' },
      alt_description: 'some photo 5',
    },
  ];
  return { slice };
};

const renderComponent = () => {
  const photos: IPhoto[] = [];
  const { slice } = returnSliceOfPhotos();
  let curPhotoIndex = 0;
  const setPhotos = jest.fn();
  const addPhoto = jest.fn();
  const deletePhoto = jest.fn();
  const turnPage = jest.fn();
  let page = 1;

  const { rerender } = render(
    <Context.Provider
      value={{
        photos,
        setPhotos,
        addPhoto,
        deletePhoto,
        turnPage,
        page,
        slice,
        curPhotoIndex,
      }}
    >
      <PhotosRoute />
    </Context.Provider>
  );
  return { turnPage, rerender, slice, page, curPhotoIndex };
};

describe('PhotosRoute', () => {
  test('should render correctly', () => {
    const { slice, page } = renderComponent();
    const pageElement = screen.getByText(`${page}`);
    const nextButton = screen.getByRole('button', { name: /next/i });
    const prevButton = screen.queryByRole('button', { name: /prev/i });

    const photoElements = screen.getAllByRole('img');

    expect(pageElement).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).not.toBeInTheDocument();
    expect(photoElements).toHaveLength(slice.length);
  });
  test('should show prev button when next button is clicked', async () => {
    let { rerender, turnPage, slice, page } = renderComponent();
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(turnPage).toHaveBeenCalled();
    expect(turnPage).toHaveBeenCalledWith('next');
    await user.click(nextButton);

    page = page + 1;
    rerender(
      <Context.Provider
        value={{
          turnPage,
          page,
          slice,
        }}
      >
        <PhotosRoute />
      </Context.Provider>
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeInTheDocument();
    const pageNumberElement = screen.getByText(`${page}`);
    expect(pageNumberElement).toHaveTextContent('2');
  });

  test('should show next slice of photos when next button is clicked', async () => {
    let { rerender, turnPage, slice, page } = renderComponent();
    page = 2;
    slice = [
      {
        id: '6',
        urls: { small: 'https://www.test.com/6' },
        alt_description: 'some photo 6',
      },
    ];
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    rerender(
      <Context.Provider
        value={{
          turnPage,
          page,
          slice,
        }}
      >
        <PhotosRoute />
      </Context.Provider>
    );

    const sliceElements = screen.getAllByRole('img');
    expect(sliceElements).toHaveLength(slice.length);
  });
});

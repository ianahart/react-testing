import { render, screen } from '@testing-library/react';
import { Context } from '../context/context';
import { mockStore } from '../utils/mockStore';
import user from '@testing-library/user-event';
import PhotosRoute from '../routes/PhotosRoute';

const renderComponent = () => {
  const { rerender } = render(
    <Context.Provider value={mockStore}>
      <PhotosRoute />
    </Context.Provider>
  );
  return { rerender, mockStore };
};

describe('PhotosRoute', () => {
  test('should render correctly', () => {
    const { rerender, mockStore } = renderComponent();
    const pageElement = screen.getByText(`${mockStore.page}`);
    const nextButton = screen.getByRole('button', { name: /next/i });
    const prevButton = screen.queryByRole('button', { name: /prev/i });

    const photoElements = screen.getAllByRole('img');

    expect(pageElement).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).not.toBeInTheDocument();
    expect(photoElements).toHaveLength(mockStore.slice.length);
  });
  test('should show prev button when next button is clicked', async () => {
    let { rerender, mockStore } = renderComponent();
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(mockStore.turnPage).toHaveBeenCalled();
    expect(mockStore.turnPage).toHaveBeenCalledWith('next', 5, true);
    await user.click(nextButton);

    mockStore.page = mockStore.page + 1;
    rerender(
      <Context.Provider value={mockStore}>
        <PhotosRoute />
      </Context.Provider>
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeInTheDocument();
    const pageNumberElement = screen.getByText(`${mockStore.page}`);
    expect(pageNumberElement).toHaveTextContent('2');
  });

  test('should show next slice of photos when next button is clicked', async () => {
    const { rerender, mockStore } = renderComponent();
    mockStore.page = 2;
    mockStore.slice = [
      {
        id: '6',
        urls: { small: 'https://www.test.com/6' },
        alt_description: 'some photo 6',
      },
    ];
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    rerender(
      <Context.Provider value={mockStore}>
        <PhotosRoute />
      </Context.Provider>
    );

    const sliceElements = screen.getAllByRole('img');
    expect(sliceElements).toHaveLength(mockStore.slice.length);
  });
});

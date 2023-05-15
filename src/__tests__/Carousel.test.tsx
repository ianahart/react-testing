import { render, screen, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import Carousel from '../components/Caraousel';
import ContextProvider, { Context } from '../context/context';
import { mockStore } from '../utils/mockStore';

const renderComponent = () => {
  const { rerender } = render(
    <Context.Provider value={mockStore}>
      <Carousel />
    </Context.Provider>
  );
  return { rerender, mockStore };
};

beforeEach(() => {
  localStorage.clear();
});

describe('Carousel', () => {
  test('should render correctly', async () => {
    const { mockStore } = renderComponent();
    const PAGE_SIZE = 3;

    const prevButton = screen.getByTestId('slideshow-prev');
    const nextButton = screen.getByTestId('slideshow-next');
    const photos = screen.getByTestId('slideshow-photos');
    const pagination = screen.getByTestId('slideshow-pagination');
    const paginationBullets = within(pagination).getAllByRole('img');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(photos).toBeInTheDocument();
    expect(pagination).toBeInTheDocument();
    expect(paginationBullets).toHaveLength(
      Math.ceil(mockStore.photos.length / PAGE_SIZE)
    );
  });
  test('should call next page function on page load', async () => {
    const { mockStore } = renderComponent();
    const PAGE_SIZE = 3;

    expect(mockStore.turnPage).toHaveBeenCalled();
    expect(mockStore.turnPage).toHaveBeenCalledWith('next', PAGE_SIZE, true);
  });

  test('should call next page function', async () => {
    const { mockStore } = renderComponent();
    const PAGE_SIZE = 3;

    const nextButton = screen.getByTestId('slideshow-next');

    await user.click(nextButton);
    expect(mockStore.turnPage).toHaveBeenCalled();
    expect(mockStore.turnPage).toHaveBeenCalledTimes(2);
    expect(mockStore.turnPage).toHaveBeenCalledWith('next', PAGE_SIZE);

  });

  test('should call prev page function', async () => {
    const { mockStore } = renderComponent();
    const PAGE_SIZE = 3;

    const prevButton = screen.getByTestId('slideshow-prev');

    await user.click(prevButton);
    expect(mockStore.turnPage).toHaveBeenCalled();
    expect(mockStore.turnPage).toHaveBeenCalledWith('prev', PAGE_SIZE);
  });
});

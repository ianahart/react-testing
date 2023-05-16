import { screen, render, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import Card from '../components/Caraousel/Card';

describe('Card', () => {
  test('should render correctly', () => {
    const item = {
      id: '1',
      urls: { small: 'https://test.com' },
      alt_description: 'some photo 1',
    };
    render(<Card handleSetModalOpen={jest.fn()} direction="next" item={item} />);

    const photo = screen.getByTestId('photo');
    const altDescription = screen.getByText(/some photo 1/i);
    const button = screen.getByRole('button', { name: /view/i });
    const svgIcon = within(button).getByTestId('svg-icon');
    const container = screen.getByTestId('container');

    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', item.urls.small);
    expect(altDescription).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(svgIcon).toBeInTheDocument();
    expect(container).toHaveClass('animateLeft');
  });

  test('container should have animateRight class when direction is prev', () => {
    const item = {
      id: '1',
      urls: { small: 'https://test.com' },
      alt_description: 'some photo 1',
    };
    render(<Card handleSetModalOpen={jest.fn()} direction="prev" item={item} />);

    const container = screen.getByTestId('container');

    expect(container).toHaveClass('animateRight');
  });

  test('modal should open when button is clicked', async () => {
    const item = {
      id: '1',
      urls: { small: 'https://test.com' },
      alt_description: 'some photo 1',
    };
    const handleSetModalOpenMock = jest.fn();
    render(
      <Card handleSetModalOpen={handleSetModalOpenMock} direction="next" item={item} />
    );

    const viewButton = screen.getByRole('button', { name: /view/i });

    await user.click(viewButton);
    expect(handleSetModalOpenMock).toHaveBeenCalled();
    expect(handleSetModalOpenMock).toHaveBeenCalledWith(true, item);
  });
});

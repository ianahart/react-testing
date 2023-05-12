import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Photo from '../components/PhotoList/Photo';

describe('Photo', () => {
  test('should render a photo on the screen with a description', () => {
    const item = {
      id: '1',
      urls: { small: 'https://www.test.com' },
      alt_description: 'some photo',
    };

    const mockHandleOnClick = jest.fn();

    render(<Photo item={item} handleOnClick={mockHandleOnClick} />);

    const photo = screen.getByRole('img');
    const description = screen.getByText(item.alt_description);

    expect(photo).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('should render "description not provided" if description is not provided', () => {
    const item = {
      id: '1',
      urls: { small: 'https://www.test.com' },
      alt_description: '',
    };

    const mockHandleOnClick = jest.fn();

    render(<Photo item={item} handleOnClick={mockHandleOnClick} />);

    const description = screen.getByText(/description not provided/i);
    expect(description).toBeInTheDocument();
  });

  test('should call handleOnClick when photo is clicked', async () => {
    const item = {
      id: '1',
      urls: { small: 'https://www.test.com' },
      alt_description: 'some photo',
    };

    const mockHandleOnClick = jest.fn();

    render(<Photo item={item} handleOnClick={mockHandleOnClick} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(mockHandleOnClick).toHaveBeenCalled();
    expect(mockHandleOnClick).toHaveBeenCalledWith({
      id: '1',
      urls: { small: 'https://www.test.com' },
      alt_description: 'some photo',
    });
  });
});

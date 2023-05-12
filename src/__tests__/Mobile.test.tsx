import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Mobile from '../components/Navbar/Mobile';

const renderComponent = () => {
  const mockIsMobileOpen = jest.fn();
  render(
    <MemoryRouter>
      <Mobile setIsMobileOpen={mockIsMobileOpen} />
    </MemoryRouter>
  );

  return { mockIsMobileOpen };
};

describe('Mobile', () => {
  test('clicking on close icon sets mobile menu to false', async () => {
    const { mockIsMobileOpen } = renderComponent();

    const closeIconButton = screen.getByRole('button');

    await user.click(closeIconButton);

    expect(mockIsMobileOpen).toHaveBeenCalled();
    expect(mockIsMobileOpen).toHaveBeenCalledWith(false);
  });

  test('clicking outside of mobile menu closes menu', async () => {
    const { mockIsMobileOpen } = renderComponent();

    await user.click(document.body);

    expect(mockIsMobileOpen).toHaveBeenCalled();
    expect(mockIsMobileOpen).toHaveBeenCalledWith(false);
  });
});

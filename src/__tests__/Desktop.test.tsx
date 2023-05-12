import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Desktop from '../components/Navbar/Desktop';

describe('Desktop', () => {
  test('it renders a hamburger icon on mobile width', () => {
    const mockIsMobileOpen = jest.fn();
    render(<Desktop navbarWidth={500} setIsMobileOpen={mockIsMobileOpen} />);

    const hamburgerIcon = screen.getByRole('button');

    expect(hamburgerIcon).toBeInTheDocument();
  });

  test('it renders links on desktop width', () => {
    const mockIsMobileOpen = jest.fn();
    render(
      <MemoryRouter>
        <Desktop navbarWidth={800} setIsMobileOpen={mockIsMobileOpen} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(3);
  });
});

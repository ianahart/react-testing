import { render, screen } from '@testing-library/react';
import Footer from '.';

test('it renders a footer at the bottom of the page', () => {
  render(<Footer />);

  const footer = screen.getByText(new RegExp('ian hart', 'i'));

  expect(footer).toBeInTheDocument();
});

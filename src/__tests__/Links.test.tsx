import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Links from '../components/Navbar/Links';

const renderComponent = () => {
  render(
    <MemoryRouter>
      <Links />
    </MemoryRouter>
  );
};

test('render three links on the page', () => {
  renderComponent();
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(3);
});

test('navigation to home page', () => {
  renderComponent();
  const homeLink = screen.getByRole('link', { name: /home/i });
  expect(homeLink).toHaveAttribute('href', '/');
});

test('naivigation to add a photo page', () => {
  renderComponent();
  const addPhotoLink = screen.getByRole('link', { name: /add photo/i });
  expect(addPhotoLink).toHaveAttribute('href', '/add');
});

test('navigation to photos page', () => {
  renderComponent();

  const photosLink = screen.getByRole('link', { name: /photos/i });
  expect(photosLink).toHaveAttribute('href', '/photos');
});

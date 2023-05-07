import { render, act, screen, waitFor, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

test('it shows mobile menu on mobile width', async () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const spy = jest.fn();
  const testWidth = 1000;
  window.addEventListener('resize', spy);

  screen.findByRole('navigation');

  window.innerWidth = testWidth;
  window.dispatchEvent(new Event('resize'));

  expect(spy).toHaveBeenCalled();
  expect(window.innerWidth).toBe(testWidth);
});

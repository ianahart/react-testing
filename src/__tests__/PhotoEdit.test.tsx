import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import PhotoEdit from '../components/PhotoList/PhotoEdit';
import { Context } from '../context/context';
import { mockStore } from '../utils/mockStore';

describe('PhotoEdit', () => {
  test('input should have correct value after updating', async () => {
    const setShowEditMock = jest.fn();
    render(
      <PhotoEdit setShowEdit={setShowEditMock} id="1" altDescription="some photo" />
    );

    const input = screen.getByRole('textbox');

    await user.click(input);
    await user.clear(input);

    await user.type(input, 'updated value');

    expect(input).toHaveValue('updated value');
  });

  test('should close PhotoEdit when cancel button is clicked', async () => {
    const setShowEditMock = jest.fn();
    const { rerender } = render(
      <PhotoEdit setShowEdit={setShowEditMock} id="1" altDescription="some photo" />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await user.click(cancelButton);

    expect(setShowEditMock).toHaveBeenCalled();
    expect(setShowEditMock).toHaveBeenCalledWith(false);
  });

  test('should update photo description', async () => {
    const setShowEditMock = jest.fn();
    const { rerender } = render(
      <Context.Provider value={mockStore}>
        <PhotoEdit setShowEdit={setShowEditMock} id="1" altDescription="some photo" />
      </Context.Provider>
    );

    const input = screen.getByRole('textbox');
    const saveButton = screen.getByRole('button', { name: /save/i });

    await user.click(input);
    await user.clear(input);
    await user.type(input, 'updated value');
    await user.click(saveButton);

    expect(mockStore.updatePhoto).toHaveBeenCalled();
    expect(mockStore.updatePhoto).toHaveBeenCalledWith('updated value', '1');
    await waitFor(() => {
      rerender(
        <Context.Provider value={mockStore}>
          <PhotoEdit setShowEdit={setShowEditMock} id="1" altDescription="some photo" />
        </Context.Provider>
      );
      expect(input).toHaveValue('updated value');
    });
  });
});

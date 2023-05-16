import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import Modal from '../components/Modal';

const renderComponent = (modalOpen: boolean) => {
  const handleSetModalOpenMock = jest.fn();
  const activePhoto = {
    id: '1',
    urls: { small: 'https://www.test.com/1' },
    alt_description: 'some photo 1',
  };
  const children = (
    <div>
      <img src={activePhoto.urls.small} alt={activePhoto.alt_description} />
      <p>{activePhoto.alt_description}</p>
    </div>
  );

  render(
    <Modal
      modalOpen={modalOpen}
      children={children}
      handleSetModalOpen={handleSetModalOpenMock}
    />
  );
  return { activePhoto, handleSetModalOpenMock };
};

describe('Modal', () => {
  test('should render correctly', () => {
    const { activePhoto } = renderComponent(true);
    const closeButton = screen.getByRole('button');
    const photo = screen.getByAltText(/some photo 1/i);
    const svgCloseIcon = screen.getByTestId('fullscreen-close');
    const photoDesc = screen.getByText(activePhoto.alt_description);

    expect(closeButton).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(svgCloseIcon).toBeInTheDocument();
    expect(photoDesc).toBeInTheDocument();
  });

  test('clicking close button should close modal', async () => {
    const { handleSetModalOpenMock } = renderComponent(true);

    const closeButton = screen.getByRole('button');

    await user.click(closeButton);

    expect(handleSetModalOpenMock).toHaveBeenCalled();
    expect(handleSetModalOpenMock).toHaveBeenCalledWith(false);
  });
  test('should not render modal when modalOpen is false', () => {
    renderComponent(false);
    const modalContainer = screen.queryByTestId('container');

    expect(modalContainer).toBeNull();
  });
});

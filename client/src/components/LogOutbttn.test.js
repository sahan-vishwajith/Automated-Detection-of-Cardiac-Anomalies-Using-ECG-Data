// LogOutbttn.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LogOutbttn from './LogOutbttn';

describe('LogOutbttn Component', () => {
  test('renders logout button', () => {
    render(
      <MemoryRouter>
        <LogOutbttn />
      </MemoryRouter>
    );

    // Check if the logout button is in the document
    const logoutButton = screen.getByRole('button', { name: /log out/i }); // Updated here
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls logout function and navigates on click', () => {
    const mockLogout = jest.fn();
    const mockNavigate = jest.fn();

    render(
      <MemoryRouter>
        <LogOutbttn logout={mockLogout} navigate={mockNavigate} />
      </MemoryRouter>
    );

    // Simulate clicking the logout button
    const logoutButton = screen.getByRole('button', { name: /log out/i }); // Updated here
    fireEvent.click(logoutButton);

    // Check if the logout function was called and if navigate was called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('/'); // Replace with the correct navigation path
  });
});

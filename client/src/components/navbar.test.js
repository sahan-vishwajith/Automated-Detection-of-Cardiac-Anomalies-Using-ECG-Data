import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for routing
import Navbar from './navbar.js'; // Adjust the import path as needed

describe('Navbar Component', () => {
  test('renders the Navbar with correct links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the Home icon (menu) is present
    expect(screen.getByLabelText(/menu/i)).toBeInTheDocument();

    // Check if the title is present
    expect(screen.getByText(/CardioCare/i)).toBeInTheDocument();

    // Check if the Admin button is present
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    // Check if the Doctors button is present
    expect(screen.getByText(/Doctors/i)).toBeInTheDocument();
    // Check if the Patients button is present
    expect(screen.getByText(/Patients/i)).toBeInTheDocument();
  });

  test('links navigate correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if the links have the correct destinations
    expect(screen.getByText(/Admin/i).closest('a')).toHaveAttribute('href', '/Admin/login');
    expect(screen.getByText(/Doctors/i).closest('a')).toHaveAttribute('href', '/Doc/login');
    expect(screen.getByText(/Patients/i).closest('a')).toHaveAttribute('href', '/Patient/login');
  });
});

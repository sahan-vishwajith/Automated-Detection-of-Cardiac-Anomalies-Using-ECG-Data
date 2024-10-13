// Navbar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './navbar';

describe('Navbar Component', () => {
  test('renders the Navbar with correct links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check if the logo (Home icon) is present
    expect(screen.getByLabelText(/menu/i)).toBeInTheDocument();
    
    // Check if the title is present
    expect(screen.getByText(/CardioCare/i)).toBeInTheDocument();
    
    // Check if Admin, Doctors, and Patients buttons are present
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    expect(screen.getByText(/Doctors/i)).toBeInTheDocument();
    expect(screen.getByText(/Patients/i)).toBeInTheDocument();
  });

  test('links navigate correctly', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check if the links have the correct destinations
    expect(screen.getByText(/Admin/i).closest('a')).toHaveAttribute('href', '/Admin/login');
    expect(screen.getByText(/Doctors/i).closest('a')).toHaveAttribute('href', '/Doc/login');
    expect(screen.getByText(/Patients/i).closest('a')).toHaveAttribute('href', '/Patient/login');
  });
});

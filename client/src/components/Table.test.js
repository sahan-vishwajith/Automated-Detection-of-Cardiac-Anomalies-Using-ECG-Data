// CustomizedTables.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomizedTables from './Table';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('CustomizedTables Component', () => {
  test('renders the table with correct headings and data', () => {
    // Create a theme for MUI components
    const theme = createTheme();

    render(
      <ThemeProvider theme={theme}>
        <CustomizedTables />
      </ThemeProvider>
    );

    // Check if the table headings are rendered correctly
    expect(screen.getByText(/Dessert \(100g serving\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Calories/i)).toBeInTheDocument();
    expect(screen.getByText(/Fat \(g\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Carbs \(g\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Protein \(g\)/i)).toBeInTheDocument();

    // Check if the data rows are rendered correctly
    expect(screen.getByText(/Frozen yoghurt/i)).toBeInTheDocument();
    expect(screen.getByText(/Ice cream sandwich/i)).toBeInTheDocument();
    expect(screen.getByText(/Eclair/i)).toBeInTheDocument();
    expect(screen.getByText(/Cupcake/i)).toBeInTheDocument();
    expect(screen.getByText(/Gingerbread/i)).toBeInTheDocument();

    // Check if the specific data values are present
    expect(screen.getByText('159')).toBeInTheDocument();
    expect(screen.getByText('6.0')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('4.0')).toBeInTheDocument();
  });
});

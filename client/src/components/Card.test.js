// src/components/Cards.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Cards from './Card.js'; // Adjust the import path if necessary

describe('Cards Component', () => {
  const mockProps = {
    bg: 'lightblue',
    border: '1px solid black',
    img: 'https://via.placeholder.com/150',
    title: 'Test Card Title',
    desc: 'This is a description for the test card.',
  };

  test('renders the card with correct props', () => {
    render(<Cards {...mockProps} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/Test Card Title/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the description is rendered
    const descElement = screen.getByText(/This is a description for the test card./i);
    expect(descElement).toBeInTheDocument();

    // Check if the image is rendered with the correct src
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', mockProps.img);
    
    // Check if the card has the correct background color
    expect(imgElement.closest('div')).toHaveStyle(`background: ${mockProps.bg}`);
    expect(imgElement.closest('div')).toHaveStyle(`border: ${mockProps.border}`);
  });
});

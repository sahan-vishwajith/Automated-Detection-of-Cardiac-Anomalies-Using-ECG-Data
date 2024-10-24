import React from 'react';
import { render, screen } from '@testing-library/react'; 
import '@testing-library/jest-dom'; // For additional matchers
import { act } from 'react'; // Import act directly from react
import FileUpload from './FileUpload'; // Adjust path accordingly

describe('FileUpload Component', () => {
  test('renders the upload button and displays selected file name', async () => {
    await act(async () => {
      render(<FileUpload />);
    });

    // Check if the upload button is present
    const uploadButton = screen.getByRole('button', { name: /upload/i });
    expect(uploadButton).toBeInTheDocument();

    // Simulate file selection
    const fileInput = screen.getByLabelText(/upload file/i); // Adjust this to match your input label
    const file = new File(['test file content'], 'test-file.txt', { type: 'text/plain' });

    await act(async () => {
      Object.defineProperty(fileInput, 'files', {
        value: [file],
      });
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Check if the selected file name is displayed
    expect(screen.getByText(/test-file.txt/i)).toBeInTheDocument();
  });
});

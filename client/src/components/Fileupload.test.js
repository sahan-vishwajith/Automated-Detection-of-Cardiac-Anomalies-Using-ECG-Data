// FileUpload.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FileUpload from './Fileupload.js'; 

describe('FileUpload Component', () => {
  test('renders the upload button and displays selected file name', () => {
    render(<FileUpload />);

    // Check if the upload button is in the document
    const uploadButton = screen.getByRole('button', { name: /upload file/i });
    expect(uploadButton).toBeInTheDocument();

    // Simulate file upload
    const file = new File(['dummy content'], 'test.dat', { type: 'application/dat' });
    const input = screen.getByLabelText(/upload file/i);

    // Simulate file selection
    fireEvent.change(input, { target: { files: [file] } });

    // Verify that the file name is displayed
    const fileNameDisplay = screen.getByText(/selected file: test.dat/i);
    expect(fileNameDisplay).toBeInTheDocument();
  });

  test('does not display a file name when no file is uploaded', () => {
    render(<FileUpload />);
    
    // Check if the file name display is not in the document initially
    const fileNameDisplay = screen.queryByText(/selected file:/i);
    expect(fileNameDisplay).not.toBeInTheDocument();
  });
});

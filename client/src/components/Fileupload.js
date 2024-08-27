import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function FileUpload() {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      sx={{ padding: '20px', border: '1px dashed grey', borderRadius: '10px' }}
    >
      <input
        accept=".dat"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
          Upload File
        </Button>
      </label>
      {fileName && (
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          Selected file: {fileName}
        </Typography>
      )}
    </Box>
  );
}

export default FileUpload;

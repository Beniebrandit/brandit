import React from 'react';
import { Box, Button } from '@mui/material';

const Text = ({ onStyleChange }) => {
  const handleHeadingClick = () => {
    //onStyleChange({ text: 'Heading Text', fontSize: 24, fontWeight: 'bold' });
  };

  const handleItalicClick = () => {
    //onStyleChange({ text: 'Italic Text', fontStyle: 'italic' });
  };

  const handleBodyTextClick = () => {
    //onStyleChange({ text: 'Body Text', fontSize: 14, fontWeight: 'normal' });
  };

  const handleCurvedTextClick = () => {
    //onStyleChange({ text: 'Curved Text', fontSize: 18, fontWeight: 'bold' });
  };

  return (
    <Box
      sx={{
        width: '300px',
        margin: '0 auto',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Heading Button */}
      <Button
        fullWidth
        onClick={handleHeadingClick}
        sx={{
          marginBottom: '12px',
          backgroundColor: '#fff',
          color: 'black',
          border: '1px solid gray',
          textTransform: 'none',
        }}
      >
        Add Heading
      </Button>

      {/* Italic Text Button */}
      <Button
        fullWidth
        onClick={handleItalicClick}
        sx={{
          marginBottom: '12px',
          backgroundColor: '#fff',
          color: 'black',
          border: '1px solid gray',
          textTransform: 'none',
        }}
      >
        Add Italic Text
      </Button>

      {/* Body Text Button */}
      <Button
        fullWidth
        onClick={handleBodyTextClick}
        sx={{
          marginBottom: '12px',
          backgroundColor: '#fff',
          color: 'black',
          border: '1px solid gray',
          textTransform: 'none',
        }}
      >
        Add Body Text
      </Button>

      {/* Curved Text Button */}
      <Button
        fullWidth
        onClick={handleCurvedTextClick}
        sx={{
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          textTransform: 'none',
        }}
      >
        Add Curved Text
      </Button>
    </Box>
  );
};

export default Text;

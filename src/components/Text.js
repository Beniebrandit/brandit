import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const Text = () => {
  return (
    <Box sx={{ width: '300px', margin: '0 auto', padding: '16px', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
      {/* Heading */}
      <TextField
        fullWidth
        variant="outlined"
        defaultValue="Add Heading"
        InputProps={{ style: { fontWeight: 'bold' } }}
        sx={{ marginBottom: '12px', backgroundColor: '#fff' }}
      />
      
      {/* Subheading */}
      <TextField
        fullWidth
        variant="outlined"
        defaultValue="Add subheading"
        sx={{ marginBottom: '12px', backgroundColor: '#fff' }}
      />

      {/* Body Text */}
      <TextField
        fullWidth
        variant="outlined"
        defaultValue="Add body text"
        sx={{ marginBottom: '12px', backgroundColor: '#fff' }}
      />

      {/* Curved Text */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px' 
      }}>
        <svg width="100%" height="auto">
          {/* Define the path for the text to follow */}
          <path id="textPath" d="M100 110 Q 160 -50 230 110" fill="transparent" />
          
          {/* Add curved text */}
          <text fill="#1976d2" fontSize="16" fontWeight="bold">
            <textPath href="#textPath" startOffset="50%" textAnchor="middle">
              Add curved text
            </textPath>
          </text>
        </svg>
      </Box>
    </Box>
  );
};

export default Text;

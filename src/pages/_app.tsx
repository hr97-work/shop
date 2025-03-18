import { AppProps } from 'next/app';
import { CartProvider } from '../contexts/CartContext';

import React from 'react';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '::-webkit-scrollbar': {
              width: '0.4em',
            },
            '::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.00)',
              WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.00)',
            },
            '::-webkit-scrollbar-thumb': {
              border: '5px solid #d1d1d1',
              borderRadius: '100px',
              backgroundColor: '#8070d4',
              backgroundClip: 'content-box',
            },
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </CartProvider>
  )
};

export default MyApp;


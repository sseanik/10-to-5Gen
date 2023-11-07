import '@mantine/core/styles.css';
import 'mantine-datatable/styles.layer.css';
import './index.css';

import { createTheme, MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const theme = createTheme({
  /** Your theme override here */
  fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
  colors: {
    // Add your color
    // or replace default theme color
    blue: [
      '#E7F5FF', // Blue 0 (brightest)
      '#D0EBFF', // Blue 1
      '#A5D8FF', // Blue 2
      '#74C0FC', // Blue 3
      '#4DABF7', // Blue 4
      '#339AF0', // Blue 5
      '#0D54FF', // Blue 6 (your new shade)
      '#001A97', // Blue 7
      '#001047', // Blue 8
      '#00061D', // Blue 9 (darkest)
    ],
    orange: [
      '#FFF4E6', // Orange 0 (brightest)
      '#FFE8CC', // Orange 1
      '#FFD8A8', // Orange 2
      '#FFC078', // Orange 3
      '#FFA94D', // Orange 4
      '#FF922B', // Orange 5
      '#f96449', // Orange 6 (your new shade)
      '#F76707', // Orange 7
      '#E8590C', // Orange 8
      '#D9480F', // Orange 9 (darkest)]
    ],
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);

import { useEffect } from 'react';
import { analytics } from '../lib/firebase';
import '../styles/globals.css';
import { ThemeProvider } from "../components/atomics/ThemeProvider";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      analytics();
    }
  }, []);

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
);
};

export default MyApp;

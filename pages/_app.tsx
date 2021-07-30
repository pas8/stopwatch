import { FC } from 'react';
import { ComposeLayouts } from 'layouts';
import ThemeLayout from 'layouts/ThemeLayout';
import StoreLayout from 'layouts/StoreLayout';
import { useUploadThemeSsr } from 'hooks/useUploadThemeSsr.hook';
import { AppProps } from 'next/dist/next-server/lib/router/router';

const Index: FC<AppProps> = ({ Component, pageProps }) => {
  useUploadThemeSsr();

  const layouts = [StoreLayout, ThemeLayout];

  return (
    <ComposeLayouts layouts={layouts} pageProps={pageProps}>
      <Component {...pageProps} />
    </ComposeLayouts>
  );
};
export default Index;

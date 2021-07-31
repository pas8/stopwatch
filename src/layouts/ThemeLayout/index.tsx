import { createTheme, ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { getThemePropertyies } from 'store/modules/App/selectors';

export type LayoutType = typeof ThemeLayout;

const ThemeLayout: FC = ({ children }) => {
  const themePropertyies = useSelector(getThemePropertyies);

  const theme = createTheme(themePropertyies);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeLayout;

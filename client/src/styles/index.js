import * as styledComponents from 'styled-components';

import { getRgba } from './helpers';

import GlobalStyles from './globalStyles';
import styledTheme from './theme';

const { default: styled, css, keyframes, ThemeProvider } = styledComponents;

export { css, keyframes, ThemeProvider, getRgba, styledTheme, GlobalStyles };
export default styled;

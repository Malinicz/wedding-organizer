import { createGlobalStyle } from 'styled-components';
import styledTheme from './theme';

import primaryFontRegular from './fonts/SofiaProRegular.ttf';
import primaryFontBold from './fonts/SofiaProBold.ttf';
import secondaryFontRegular from './fonts/AdornCondensedSans.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: ${styledTheme.fontFamily.primary.regular};
        src: url('${primaryFontRegular}');
        font-weight: 400;
        font-style: normal;
    }
    @font-face {
        font-family: ${styledTheme.fontFamily.primary.bold};
        src: url('${primaryFontBold}');
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: ${styledTheme.fontFamily.secondary.regular};
        src: url('${secondaryFontRegular}');
        font-weight: 400;
        font-style: normal;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        color: ${styledTheme.colors.darker};
        font-size: 16px;
        font-family: ${styledTheme.fontFamily.primary.regular};
        line-height: 20px;
        background-color: ${styledTheme.colors.primary};
    }

    a {
        display: inline-block;

        &:hover {
            opacity: 0.7;
        }

        &:active {
            transform: scale(0.99);
        }
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${styledTheme.fontFamily.secondary.regular};
    }

`;

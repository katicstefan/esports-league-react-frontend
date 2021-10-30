import React from 'react';
import { createMuiTheme } from "@material-ui/core";
import * as colors from '../variables/colors.scss'

const redTheme = createMuiTheme({
    palette: {
        primary: {
            light: `${colors.redLight}`,
            main: `${colors.redMain}`,
            dark: `${colors.redDark}`,
            contrastText: '#fff',
        },
        secondary: {
            light: `${colors.greyLight}`,
            main: `${colors.greyMain}`,
            dark: `${colors.greyDark}`,
            contrastText: '#fff',
        },
    },
});
  

export default redTheme;
import { createMuiTheme }  from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#333384',
            main: '#000066',
            dark: '#000047',
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#e68a37',
            main: '#E06D06',
            dark: '#9c4c04',
            contrastText: '#FFFFFF'
        },
    },
});
export default theme;

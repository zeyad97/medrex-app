import { createMuiTheme }  from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#4747FF',
            main: '#0000CC',
            dark: '#0000A3',
            contrastText: '#FFFFFF'
        },
        secondary: {
            light: '#FFA347',
            main: '#FF8F1F',
            dark: '#CC6600',
            contrastText: '#FFFFFF'
        },
    },
});
export default theme;

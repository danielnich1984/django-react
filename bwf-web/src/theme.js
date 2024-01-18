import { amber, lightBlue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme ({
    palette: {
        primary:amber,
        secondary:lightBlue
    },

    colors: {
        bgColor: '#3e3e3d',
        bgLightColor: '#888',
        mainAccentColor: '#fecc01',
    },

});

export default theme;
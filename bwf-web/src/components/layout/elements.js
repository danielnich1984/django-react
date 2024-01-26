import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const CssTextField = styled(TextField)(({ theme }) => ({
      input: {
        color: "rgb(232, 241, 250)"
      },
      
      '& label.Mui-focused': {
        color: theme.palette.secondary.main,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.secondary.main,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: theme.palette.secondary.main,
        },
        '&:hover fieldset': {
          borderColor: theme.palette.secondary.main,
        },
        '&.Mui-focused fieldset': {
          borderColor: theme.palette.secondary.main,
        },
      },    
}));
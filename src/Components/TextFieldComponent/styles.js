/*eslint-disable*/

import styled from 'styled-components';
import TextFieldmui from '@mui/material/TextField';

export const TextFieldComponent = styled(TextFieldmui)`
    //margin: 0 !important;
    //padding: 0 !important;

    & .MuiInputLabel-root{
        color: white !important;
    }

    & .MuiInput-input {
        color: white;
    }

    & .css-1x51dt5-MuiInputBase-input-MuiInput-input{
        color: white !important;
    }

    & .css-lj2z6i-MuiInputBase-root-MuiInput-root:before{
        border-bottom: 1px solid white
    }

    & .MuiFilledInput-root{
        background-color: rgba(255,255,255,0.1) !important;
    }

    

    //.MuiOutlinedInput-input, .MuiInputBase-input, .MuiSelect-select{
        //padding: 5px 30px 5px 10px !important;
        //height: 40px !important;
        //color: white !important;
    //}

`;


import { Button } from "@mui/material";
import styled from "styled-components";

export const ButtonRegister = styled(Button)`
    &.MuiButton-root{
        background:${(props)=> props.disabled == true ? 'rgba(150, 150, 150, 0.38)' : props.bottaoCadEventos == true ? 'linear-gradient(to bottom right, #902747, #542864B0)' : 'rgba(227, 92, 133, 0.38)'};
        color: ${(props)=> props.disabled == true && props.bottaoCadEventos == true ? 'white !important' : ''};
        border: 0;
        border-radius: 15px;
        padding: 8px 20px;
    }
`;
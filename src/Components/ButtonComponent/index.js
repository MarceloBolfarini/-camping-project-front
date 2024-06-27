

import { ButtonRegister as Button } from "./styles";

const ButtonRegister = ({ variant, disabled, onClick, text, color, type, bottaoCadEventos }) => {

    return (
        <Button
            variant={variant}
            disabled={disabled}
            onClick={onClick}
            color={color}
            type={type}
            bottaoCadEventos={bottaoCadEventos}
            
        >
        {text}
        </Button>
    )
}

export default ButtonRegister;
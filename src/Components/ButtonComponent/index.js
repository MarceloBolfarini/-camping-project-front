

import { ButtonRegister as Button } from "./styles";

const ButtonRegister = ({ variant, disabled, onClick, text, color, type }) => {

    return (
        <Button
            variant={variant}
            disabled={disabled}
            onClick={onClick}
            color={color}
            type={type}
            
        >
        {text}
        </Button>
    )
}

export default ButtonRegister;
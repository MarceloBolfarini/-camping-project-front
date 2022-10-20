

import { ButtonRegister as Button } from "./styles";

const ButtonRegister = ({ variant, disabled, onClick, text, color }) => {


    return (
        <Button
            variant={variant}
            disabled={disabled}
            onClick={onClick}
            color={color}
        >
        {text}
        </Button>
    )
}

export default ButtonRegister;
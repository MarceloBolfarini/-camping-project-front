import Swal from "sweetalert2"

export const Modal = ({ buttonLeftText, buttonRightText, Title, Message, Icon, showCancelButton, isConfirmed}) => {

    return (
        Swal.fire({
            title: Title,
            text: Message,
            icon: Icon,
            showCancelButton: showCancelButton,
            confirmButtonColor: "#313131",
            confirmButtonText: buttonLeftText,
            cancelButtonColor: 'linear-gradient(to bottom right, #902747, #542864B0)',
            cancelButtonText: buttonRightText,
            background: "#414141"
        }).then((result) => {
            if(result.isConfirmed){
                return isConfirmed
            }
        })
    )

}

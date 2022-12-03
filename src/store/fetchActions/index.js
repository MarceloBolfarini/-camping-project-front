import Swal from 'sweetalert2';
import { api } from '../../services/api'
import { login } from '../ducks/auth';


export const authLogin = (user) => {
    return dispatch => {
        api.post("/auth", user)
            .then(res =>{
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('usuario', JSON.stringify(res.data.usuario));
                dispatch(login());
                window.location.pathname = '/home'                
            })
            .catch(
                err =>{
                if(err.response.status == 400)
                Swal.fire({
                    icon: "error",
                    title: "Credenciais Inválidas"
                })
                }
            );
    }
}
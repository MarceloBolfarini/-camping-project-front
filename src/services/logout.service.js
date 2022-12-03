import { logout } from '../store/ducks/auth'

export default function Logout () {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.pathname = '/' 
    return logout();
    
}
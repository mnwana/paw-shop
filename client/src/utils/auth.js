
// IMPORT
import decode from 'jwt-decode';


// name of JWT in `localStorage`
export const localStorageTokenName = 'paw_shop_jwt';


class AuthService {
    getProfile(){
        return decode(this.getToken());
    }

    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token){
        try{
            const decoded = decode(token);
            return Date.now() / 1000 > decoded.exp;
        }catch{
            return false;
        }
    }

    getToken(){
        return localStorage.getItem(localStorageTokenName);
    }

    login(idToken){
        localStorage.setItem(localStorageTokenName, idToken);
        window.location.assign('/');
    }

    logout(){
        localStorage.removeItem(localStorageTokenName);
        window.location.assign('/');
    }
}


// EXPORT
export default new AuthService();

export function validateEmail(email){
    return !!email.match(/^[a-z0-9._]{3,}@([a-z0-9-]+\.)+?[a-z]{2,3}$/i);
}
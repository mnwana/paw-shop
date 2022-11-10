
export function validateEmail(email){
    return !!email.match(/^[a-z0-9._]{3,}@([a-z0-9-]+\.)+?[a-z]{2,3}$/i);
}

export function joinAuthors(authors){
    return (
            authors.slice(0, authors.length - 1).join(', ')
        +
            ' + '
        +
            authors[authors.length - 1]
    );
}

export function validateEmail(email){
    return !!email.match(/^[a-z0-9._]{3,}@([a-z0-9-]+\.)+?[a-z]{2,3}$/i);
}

export function joinAuthors(authors){
    function authorLink(author, charsAfter = ''){
        return (
            <span key={author.name}>
                <a href={`https://github.com/${author.github}`} target='_blank'>{author.name}</a>
                {charsAfter}
            </span>
        );
    }

    return (
        <>
        {authors.slice(0, authors.length - 2).map(author => authorLink(author, ', '))}
        {authorLink(authors[authors.length - 2], ' + ')}
        {authorLink(authors[authors.length - 1])}
        </>
    );
}

export function joinAuthors(authors){
    const authorLink = (author, charsAfter = '') =>
        <span key={author.name}>
            <a href={author.link} target='_blank'>{author.name}</a>
            {charsAfter}
        </span>
    ;

    return <>
        {authors.slice(0, authors.length - 2).map(author => authorLink(author, ', '))}
        {authorLink(authors[authors.length - 2], ' + ')}
        {authorLink(authors[authors.length - 1])}
    </>;
}


export function kebabify(string){
    return string.replace('/ ', '').split(' ').join('-');
}


export function capitalize(string){
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}


export function abbreviate(string){
    return string.length < 35 ? string : string.substring(0, 35) + '…'
}
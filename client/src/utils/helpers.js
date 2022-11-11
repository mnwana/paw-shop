
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
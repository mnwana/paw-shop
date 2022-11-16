
export const siteTitle = 'Paw Shop';


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
    const maxLength = 40;
    return string.length < maxLength ? string : string.substring(0, maxLength) + '…';
}


export function capitalizeEachWord(string){
    return string.split(' ').map(word => capitalize(word)).join(' ');
}
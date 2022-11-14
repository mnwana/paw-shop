
// COMPONENT
export default function Reply({replierUsername, content, dateCreated}){
    return <>
        <div className="reply">
            <p>{content}</p>

            <p className="reply-meta">
                <span className="username-meta">{replierUsername}</span>
                {' '}|{' '}
                {dateCreated}
            </p>
        </div>
    </>;
}
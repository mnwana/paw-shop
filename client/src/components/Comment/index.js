
// COMPONENT
export default function Comment({username, content, dateCreated}){
    return <>
        <div className="comment">
            <p>{content}</p>

            <p><span>{username} | {dateCreated}</span></p>
        </div>
    </>;
}
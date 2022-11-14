
// IMPORT
import DeleteBtn from "../DeleteBtn";

// COMPONENT
export default function Reply({commentId, replyId, replierUsername, content, dateCreated}){
    return <>
        <div className="reply">
            <p>{content}</p>

            <div className="reply-meta-and-delete-btn-wrapper meta-and-delete-btn-wrapper d-flex">
                <DeleteBtn commentId={commentId} replyId={replyId} />

                <p className="reply-meta">
                    <span className="username-meta">{replierUsername}</span>
                    {' '}|{' '}
                    {dateCreated}
                </p>
            </div>
        </div>
    </>;
}
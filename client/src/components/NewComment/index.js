
// COMPONENT
export default function NewComment({postUsername}){
    return <>
        <div className="new-comment-wrapper">
            <div className="form-floating">
                <input className="form-control form-control-sm" id='new-comment' placeholder="Enter new comment" />
                <label htmlFor="new-comment">New comment</label>
            </div>

            <p>Only <span>{postUsername}</span> will see and be able to reply to your comment</p>
        </div>
    </>;
}
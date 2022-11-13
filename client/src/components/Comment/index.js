
// IMPORTS


// COMPONENT
export default function Comment({commenterUsername, origPostUsername, content, dateCreated}){
    return <>
        <div className="comment">
            <p>{content}</p>

            <p><span>{commenterUsername} | {dateCreated}</span></p>

            {commenterUsername === "logged-in user's username" ?  // UPDATE LATER
                <p>
                    Only you and{' '}
                    <span className="orig-post-username">{origPostUsername}</span>
                    {' '}can see and reply to this comment
                </p>
            :
                <></>  // If the original post-er is logged in, don't display any such message
            }
        </div>
    </>;
}
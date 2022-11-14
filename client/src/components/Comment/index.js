
// COMPONENT
export default function Comment({commentId, commenterUsername, origPostUsername, content, dateCreated = null, dateUpdated = null}){
    return <>
        <div id={`comment-${commentId}`} className="comment">
            <p>{content}</p>

            <p className="comment-meta"><span className="username-meta">{commenterUsername}</span> |{' '}
                    {dateCreated ?
                        <>Comment posted on <span className="date-meta">{dateCreated}</span></>
                    :
                        <>Most recently replied to on <span className="date-meta">{dateUpdated}</span></>
                    }
            </p>

            {"logged-in user's username" === commenterUsername || "logged-in user's username" === origPostUsername ?  // UPDATE LATER
                <p>
                    Only you and{' '}
                    <span className="username-meta">
                        {"logged-in user's username" === commenterUsername ?
                            {origPostUsername}
                        :
                            {commenterUsername}
                        }
                    </span>
                    {' '}can see and reply to this comment
                </p>
            :
                <></>
            }
        </div>
    </>;
}
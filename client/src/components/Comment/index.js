
// IMPORTS
import DeleteBtn from '../DeleteBtn';

import {Link} from 'react-router-dom';

import './index.css';



// COMPONENT
export default function Comment({commentId, commenterUsername, origPostUsername, content, dateCreated = null, dateUpdated = null}){
    return <>
        <div id={`comment-${commentId}`} className="comment rounded mx-2 px-2 pt-3 pb-1">
            <p className='mx-md-1 mb-1'>{content}</p>

            <div className="comment-meta-and-delete-btn-wrapper d-flex align-items-center mb-2">
                <DeleteBtn commentId={commentId} />

                <p className="comment-meta mb-0 ps-2">
                    <Link to={`/user/${commenterUsername}`} className="username-meta hover-opacity">{commenterUsername}</Link><span className='border-end border-dark'>&ensp;</span>&ensp;
                    
                    <span className='fst-italic'>
                        {dateCreated ?
                            <>Comment posted on <span className="date-meta">{dateCreated}</span></>
                        :
                            <>Most recently replied to on <span className="date-meta">{dateUpdated}</span></>
                        }
                    </span>
                </p>
            </div>

            {/* DEBUG */}
            {"logged-in user's username" === commenterUsername || "logged-in user's username" === origPostUsername ?  // UPDATE LATER
                <p>
                    Only you and{' '}
                    <span className="username-meta hover-opacity">
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
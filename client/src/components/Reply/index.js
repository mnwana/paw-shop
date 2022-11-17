
// IMPORTS
import DeleteBtn from "../DeleteBtn";

import {Link} from "react-router-dom";

import './index.css';


// COMPONENT
export default function Reply({commentId, replyId, replierUsername, content, dateCreated}){
    return <>
        <div className="reply rounded border border-top-0 px-2 pt-3 pb-0">
            <p className="mx-1 mx-md-2 mb-1">{content}</p>

            <div className="reply-meta-and-delete-btn-wrapper d-flex align-items-center mx-1 mx-md-2 mb-2">
                {/* <DeleteBtn commentId={commentId} replyId={replyId} /> */}

                <p className="reply-meta mb-0 ps-2">
                    {/* <Link to={`/user/${replierUsername}`} className="username-meta hover-opacity">{replierUsername}</Link> */}
                    <span>{replierUsername}</span>
                    <span className='border-end border-dark'>&ensp;</span>&ensp;

                    <span className="date-meta fst-italic">{dateCreated}</span>
                </p>
            </div>
        </div>
    </>;
}
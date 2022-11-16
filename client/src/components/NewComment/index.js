
// IMPORTS
import {useState} from 'react';

import {useParams} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-solid-svg-icons';



// COMPONENT
export default function NewComment({postUsername}){
    const {postId} = useParams();
    const [commentText, setCommentText] = useState('');


    function handleSubmit(e){
        e.preventDefault();

        const text = commentText.trim();

        if (text){
            alert(`
                Getting ready for the logged-in user to add a new comment on post ${postId}
                with this message: ${text}
            `);  // UPDATE LATER
            
            setCommentText('');
        }
    }


    return <>
        <form id="new-comment-form" onSubmit={handleSubmit}>
            <div className="form-floating">
                <input
                    className="form-control form-control-sm"
                    id='new-comment'
                    placeholder="Enter new comment"
                    value={commentText}
                    onChange={({target}) => setCommentText(target.value)}
                />
                <label htmlFor="new-comment">New comment</label>
            </div>

            <p>Only <span>{postUsername}</span> will see and be able to reply to your comment</p>

            <button type='submit' form='new-comment-form'>
                <FontAwesomeIcon icon={faComment} />
            </button>
        </form>
    </>;
}
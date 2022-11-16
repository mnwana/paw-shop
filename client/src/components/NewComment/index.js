
// IMPORTS
import {useState} from 'react';

import {useParams, Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-solid-svg-icons';

import './index.css';



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
        <form id="new-comment-form" onSubmit={handleSubmit} className='mx-4 mb-4'>
            <div className='d-flex align-items-center mb-1'>
                <div className="form-floating flex-grow-1 me-1">
                    <input
                        className="form-control form-control-sm"
                        id='new-comment'
                        placeholder="Enter new comment"
                        value={commentText}
                        onChange={({target}) => setCommentText(target.value)}
                    />
                    <label htmlFor="new-comment">Send a private message to {postUsername}</label>
                </div>

                <button type='submit' form='new-comment-form' className='btn submit-btn hover-opacity py-1' style={{height: '50%'}}>
                    <FontAwesomeIcon icon={faComment} />
                </button>
            </div>

            {/* <p className='new-comment-msg fst-italic ps-1'>
                Only{' '}
                <Link className='username-meta hover-opacity' to={`/user/${postUsername}`}>{postUsername}</Link>
                {' '}will see and be able to reply to your comment
            </p> */}
        </form>
    </>;
}
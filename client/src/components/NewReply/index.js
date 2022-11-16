
// IMPORTS
import {useState} from 'react';

import {useParams} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faReply} from '@fortawesome/free-solid-svg-icons';

import './index.css';



// COMPONENT
export default function NewReply({commentId, otherUsername}){
    const {postId} = useParams();
    const [replyText, setReplyText] = useState('');


    function handleSubmit(e){
        e.preventDefault();
        
        const text = replyText.trim();

        if (text){
            alert(`
                Getting ready for the logged-in user to reply to comment ${commentId} (on post ${postId})
                with this message: ${text}
            `);  // UPDATE LATER
            
            setReplyText('');
        }
    }


    return <>
        <form id={`new-reply-form-for-comment-${commentId}`} className='new-reply-form d-flex align-items-center' onSubmit={handleSubmit}>
            <div className="form-floating flex-grow-1 me-1">
                <input
                    className="form-control form-control-sm"
                    id={`new-reply-for-comment-${commentId}`}
                    placeholder="Enter new reply"
                    value={replyText}
                    onChange={({target}) => setReplyText(target.value)}
                />
                <label htmlFor={`new-reply-for-comment-${commentId}`}>Reply privately to {otherUsername}</label>
            </div>

            <button type='submit' form={`new-reply-form-for-comment-${commentId}`} className='btn submit-btn hover-opacity py-1' style={{height: '50%'}}>
                <FontAwesomeIcon icon={faReply} />
            </button>
        </form>
    </>;
}
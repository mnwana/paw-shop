
// IMPORTS
import {useState} from 'react';

import {useParams} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faReply} from '@fortawesome/free-solid-svg-icons';

import {useMutation} from '@apollo/client';
import {ADD_REPLY} from '../../utils/mutations'
import {QUERY_POST} from '../../utils/queries';

import './index.css';



// COMPONENT
export default function NewReply({commentId, otherUsername}){
    const {postId} = useParams();
    const [replyText, setReplyText] = useState('');

    const [addReply] = useMutation(ADD_REPLY, {
        update: (cache, {data: {addReply}}) => {
            cache.writeQuery({
                query: QUERY_POST,
                data: {post: {
                    ...addReply,
                    user: {username: addReply.user.username},
                    dateCreated: addReply.createdAt,
                    description: addReply.postText
                }}
            });
        }
    })


    async function handleSubmit(e){
        e.preventDefault();
        
        const text = replyText.trim();

        if (text){
            await addReply({variables: {
                postId,
                commentId,
                replyBody: text
            }});
            
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
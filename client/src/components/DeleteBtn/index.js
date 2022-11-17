
// THIS COMPONENT supplies a delete btn for Comments and Replies only
// (the Post delete btn includes a modal feature, and is handled by `DeletePostBtnAndModal`)

// IMPORTS
import {useParams} from 'react-router-dom';

import {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';

import './index.css';



// COMPONENT
export default function DeleteBtn({commentId, replyId = null}){
    const {postId} = useParams();

    const [showConfirm, setShowConfirm] = useState(false);

    function handleYesDelete(){  // UPDATE LATER
        alert(`
            Getting ready to delete:
            ${replyId ?
                `Reply ${replyId}
                (from Comment ${commentId})
                `
            :
                `Comment ${commentId}`
            }
            (from Post ${postId})
        `);

        setShowConfirm(false);  // this may not ultimately be necessary
    }


    return <>
        {showConfirm ? 
            <div className='confirm-delete-wrapper d-flex align-items-center px-2'>
                <p className='confirm-delete-msg pe-1 mb-0'>Are you sure?</p>

                <div className='confirm-delete-btns-wrapper d-flex me-1 mb-2'>
                    <button className="confirm-delete-yes-btn btn py-1 mx-1" onClick={handleYesDelete}>
                        Yes
                    </button>

                    <button className="confirm-delete-no-btn btn py-1 mx-1" onClick={() => setShowConfirm(false)}>
                        No
                    </button>
                </div>
            </div>
        :
            <button className='delete-btn btn hover-opacity px-2' onClick={() => setShowConfirm(true)}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        }

        
    </>;
}
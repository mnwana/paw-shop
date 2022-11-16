
// THIS COMPONENT supplies a delete btn for Comments and Replies only
// (the Post delete btn includes a modal feature, and is handled by `DeletePostBtnAndModal`)

// IMPORTS
import {useParams} from 'react-router-dom';

import {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';



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
            <div className='confirm-delete-wrapper'>
                <p className='confirm-delete-msg'>Are you sure?</p>

                <div className='confirm-delete-btns-wrapper'>
                    <button className="confirm-delete-yes-btn btn btn-danger" onClick={handleYesDelete}>
                        Yes
                    </button>

                    <button className="confirm-delete-no-btn btn btn-primary" onClick={() => setShowConfirm(false)}>
                        No
                    </button>
                </div>
            </div>
        :
            <button className='delete-btn btn' onClick={() => setShowConfirm(true)}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        }

        
    </>;
}
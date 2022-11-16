
// IMPORTS
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';

import './index.css';


// COMPONENT
export default function DeletePostBtnAndModal({postId, returnToHome}){
    const modalIdBeginning = 'delete-post-modal-'

    async function handleYesDelete(){
        alert('A GraphQL mutation should now be run to delete post ' + postId);  // UPDATE LATER to AWAIT a mutation to delete this post

        if (returnToHome)
            document.location.assign('/');
        else
            document.location.reload();
    }


    return <>
        <button
            className='delete-btn btn d-inline-block hover-opacity'
            data-bs-toggle='modal'
            data-bs-target={`#${modalIdBeginning}${postId}`}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>

        <div className="modal fade" id={`${modalIdBeginning}${postId}`} tabIndex="-1" aria-labelledby='Delete post window' aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <p className="confirm-delete-post-msg confirm-delete-msg text-center">Are you sure you want to delete this post?</p>

                        <div className="confirm-delete-post-btns-wrapper d-flex justify-content-center">
                            <button className="confirm-delete-yes-btn btn mx-2 hover-opacity" onClick={handleYesDelete}>
                                Yes
                            </button>

                            <button className="confirm-delete-no-btn btn mx-2 hover-opacity" data-bs-dismiss="modal" aria-label="Close">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
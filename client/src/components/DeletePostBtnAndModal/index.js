
// IMPORTS
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';


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
            className='delete-btn btn d-inline-block'
            data-bs-toggle='modal'
            data-bs-target={`#${modalIdBeginning}${postId}`}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>

        <div className="modal fade" id={`${modalIdBeginning}${postId}`} tabIndex="-1" aria-labelledby='Delete post window' aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <p className="confirm-delete-msg">Are you sure you want to delete this post?</p>

                        <div className="confirm-delete-btns-wrapper d-flex justify-content-center">
                            <button className="confirm-delete-yes-btn btn btn-danger" onClick={handleYesDelete}>
                                Yes
                            </button>

                            <button className="confirm-delete-no-btn btn btn-primary" data-bs-dismiss="modal" aria-label="Close">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
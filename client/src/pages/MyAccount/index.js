
// IMPORT
import {kebabify} from '../../utils/helpers';



// COMPONENT
export default function MyAccount(){
    return <>
        <div className="acct-mngmt-btns-wrapper">
            <button data-bs-toggle="modal" data-bs-target='#update-email-modal'>Update email</button>
            <button data-bs-toggle="modal" data-bs-target='#update-username-modal'>Update username</button>
            <button data-bs-toggle="modal" data-bs-target='#update-password-modal'>Update password</button>
            <button data-bs-toggle="modal" data-bs-target='#delete-account-modal'>Delete account</button>
        </div>

        <div className="your-posts">
            <h3>Your posts</h3>

            <div className="posts-wrapper"></div>
        </div>

        <div className="watched-items">
            <h3>Items you're watching</h3>

            <div className="active-watched-items watched-items"></div>

            <div className="inactive-watched-items watched-items"></div>
        </div>
    </>;
}
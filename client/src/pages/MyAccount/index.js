
// COMPONENT
export default function MyAccount(){
    return <>
        <div className="account-management-buttons-wrapper">
            <button>Update email</button>
            <button>Update username</button>
            <button>Update password</button>
            <button>Delete account</button>
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
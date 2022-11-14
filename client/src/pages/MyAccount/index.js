
// IMPORTS
import PostInfo from '../../components/PostInfo';

import {kebabify, capitalize} from '../../utils/helpers';
import AcctMngmntModals from '../../components/AcctMngmntModals';
    import {AcctMngmntModalTypes} from '../../components/AcctMngmntModals';



// COMPONENT
export default function MyAccount(){
    return <>
        <AcctMngmntModals />
    
        <h2 className='welcome-user user-header'>
            Welcome, username <span className='fst-italic fs-3'>(Current Borough)</span> {/* UPDATE LATER to pull username and borough from query */}
        </h2>

        <div className="acct-mngmt-btns-wrapper">
            {AcctMngmntModalTypes.map(type => 
                <button
                    data-bs-toggle="modal"
                    data-bs-target={`#${kebabify(type)}-modal`}
                    key={type}
                >
                    {capitalize(type)}
                </button>    
            )}
        </div>

        <div className="your-posts">
            <h3>Your posts</h3>

            <div className='your-active-posts-wrapper active-posts-wrapper posts-wrapper'>
                <h4>Active</h4>

                {/* Sample post info */}
                <PostInfo
                    postId={123456}
                    name={'Test active name'}
                    dateCreated={'Sep 8, 2021 at 7:40 AM'}
                    watchCount={1}
                    toggleBtn={true}
                    active={true}
                    showDeleteBtn={true}
                />
            </div>
            
            <div className='your-inactive-posts-wrapper inactive-posts-wrapper posts-wrapper'>
                <h4 className='fst-italic'>Inactive</h4>

                {/* Sample post info */}
                <PostInfo
                    postId={123456990}
                    name={'Test inactive name'}
                    dateCreated={'Jan 12, 2020 at 7:19 PM'}
                    watchCount={0}
                    toggleBtn={true}
                    active={false}
                    showDeleteBtn={true}
                />
            </div>
        </div>

        <div className="watched-items">
            <h3>Items you're watching</h3>

            <div className="active-watched-items-wrapper watched-items-wrapper active-posts-wrapper posts-wrapper">
                <h4>Active</h4>

                {/* Sample post info */}
                <PostInfo
                    postId={87213}
                    name={'Test watching active name'}
                    watchCount={4}
                    active={true}
                />
            </div>

            <div className="inactive-watched-items watched-items-wrapper inactive-posts-wrapper posts-wrapper">
                <h4 className='fst-italic'>Inactive</h4>

                {/* Sample post info */}
                <PostInfo
                    postId={45790}
                    name={'Test watching inactive name'}
                    watchCount={39}
                    active={false}
                />
            </div>
        </div>
    </>;
}
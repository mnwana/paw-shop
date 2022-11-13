
// IMPORTS
import {useParams, Navigate} from 'react-router-dom';

import PostInfo from '../../components/PostInfo';


// COMPONENT
export default function User(){
    const {userId} = useParams();


    if (userId === "logged-in user's id")  // UPDATE LATER
        return <Navigate to='/account' />;


    return <>
        <h2 className='user-header'>
            username <span className='fst-italic fs-3'>(Current Borough)</span> {/* UPDATE LATER to pull username and borough from query */}
        </h2>

        <div className='active-posts-wrapper posts-wrapper'>
                <h4>Active posts</h4>

                {/* UPDATE LATER */}
                {/* Sample post info */}
                <PostInfo
                    postId={1234569963}
                    name={'Test active name'}
                    dateCreated={'May 17, 2014 at 11:51 AM'}
                    watchCount={6}
                    active={true}
                />
            </div>
    </>;
}

// IMPORTS
import {useEffect} from 'react';
import {useStoreContext} from '../../utils/GlobalState';
import {SET_NAV_ACTIVE_PAGE} from '../../utils/actions';

import {useParams, Navigate} from 'react-router-dom';

import PostInfo from '../../components/PostInfo';
import ResultsSelector from '../../components/ResultsSelector';


// COMPONENT
export default function User(){
    const {username} = useParams();
    const [, dispatch] = useStoreContext();

    useEffect(
        () => {
            dispatch({
                type: SET_NAV_ACTIVE_PAGE,
                navActivePage: `${username}'s active items)`
            });
        },
        []
    );

    if (username === "logged-in user's username")  // UPDATE LATER
        return <Navigate to='/account' />;


    return <>
        <h2 className='user-header text-center mt-2 mb-4'>
            username <span className='fst-italic fs-3'>(Current Borough)</span> {/* UPDATE LATER to pull username and borough from query */}
        </h2>

        <div className='active-posts-wrapper posts-wrapper d-flex flex-column align-items-center w-100'>
            <h4 className='mb-3'>Active posts</h4>

            {/* UPDATE LATER */}
            {/* Sample post info */}
            <PostInfo
                postId={1234569963}
                title={'Test active title'}
                dateCreated={'May 17, 2014 at 11:51 AM'}
                watchCount={6}
                active={true}
            />

            <ResultsSelector totalPages={2} name={'user-posts'} />  {/* UPDATE LATER */}
        </div>

        
    </>;
}
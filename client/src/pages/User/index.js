
// IMPORTS
import {useEffect} from 'react';

import {useParams, Navigate} from 'react-router-dom';

import PostInfo from '../../components/PostInfo';
import ResultsSelector from '../../components/ResultsSelector';


// COMPONENT
export default function User(){
    const {username} = useParams();

    useEffect(
        () => {document.title = `Paw Shop | ${username}'s active items`},
        []
    );


    if (username === "logged-in user's username")  // UPDATE LATER
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
                title={'Test active title'}
                dateCreated={'May 17, 2014 at 11:51 AM'}
                watchCount={6}
                active={true}
            />

            <ResultsSelector totalPages={2} />  {/* UPDATE LATER */}
        </div>

        
    </>;
}
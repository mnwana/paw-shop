
// IMPORTS
import {useParams, Link} from 'react-router-dom';

import {capitalizeEachWord} from '../../utils/helpers';

import Comment from '../../components/Comment';
import NewComment from '../../components/NewComment';
import ResultsSelector from '../../components/ResultsSelector';


// COMPONENT
export default function SinglePost(){
    const {postId} = useParams();  // UPDATE LATER

    // Sample post content
    const
        name = 'Test name',
        username = 'testusername',
        borough = 'manhattan',
        dateCreated = 'Mar 9, 2018 at 6:21 AM',
        description = 'Test description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
    ;

    return <>
        <div className='post-content'>
            <h3>{name}</h3>

            <p>
                Posted by{' '}
                <Link to={`/user/${username}`}>{username}</Link>{' '}
                <span>{'('}{capitalizeEachWord(borough)}{')'}</span>{' '}
                on{' '}<span>{dateCreated}</span>
            </p>

            <p className='description'>{description}</p>
        </div>

        <div className='comments-wrapper'>
            <div className='comments'>
                {/* Sample comments */}
                {/* UPDATE LATER:
                    If the original poster is logged in, query all comments;
                    otherwise, only query/display comments for which the commenter is the user who's logged in
                    (and if nobody's logged in, don't show any comments; instead, show a message like 'Log in to comment and communicate with {username} about this item')
                */}
                <Comment
                    commenterUsername={'testuser091'}
                    origPostUsername={username}
                    content={'This is another test comment'}
                    dateCreated={'Jun 24, 2016 at 1:46 PM'}
                />

                <Comment
                    commenterUsername={'testuser229'}
                    origPostUsername={username}
                    content={'This is a test comment'}
                    dateCreated={'Jun 8, 2012 at 10:01 PM'}
                />
            </div>

            <ResultsSelector totalPages={11} /> {/* UPDATE LATER */}
            
            {/* UPDATE LATER: only show `NewComment` if a user is logged in, and that user is NOT the original post-er */}
            <NewComment postUsername={username} />
        </div>
    </>;
}
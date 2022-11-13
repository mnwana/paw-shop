
// IMPORTS
import {useParams, Link} from 'react-router-dom';

import {capitalizeEachWord} from '../../utils/helpers';

import Comment from '../../components/Comment';
import NewComment from '../../components/NewComment';


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
                <Comment
                    username={'testuser091'}
                    content={'This is another test comment'}
                    dateCreated={'Jun 24, 2016 at 1:46 PM'}
                />

                <Comment
                    username={'testuser229'}
                    content={'This is a test comment'}
                    dateCreated={'Jun 8, 2012 at 10:01 PM'}
                />
            </div>

            <NewComment postUsername={username} />
        </div>
    </>;
}
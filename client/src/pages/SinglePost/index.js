
// IMPORTS
import {useParams, Link} from 'react-router-dom';

import {capitalizeEachWord} from '../../utils/helpers';


// COMPONENT
export default function SinglePost(){
    const {postId} = useParams();

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
    </>;
}
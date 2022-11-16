
// IMPORTS
import {useParams, Link} from 'react-router-dom';

import {useEffect} from 'react';
import {useStoreContext} from '../../utils/GlobalState';
import {SET_NAV_ACTIVE_PAGE} from '../../utils/actions';

import {useState} from 'react';

import {capitalizeEachWord} from '../../utils/helpers';

import DeletePostBtnAndModal from '../../components/DeletePostBtnAndModal';
import Comment from '../../components/Comment';
import Reply from '../../components/Reply';
import NewReply from '../../components/NewReply';
import ResultsSelector from '../../components/ResultsSelector';
import NewComment from '../../components/NewComment';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenNib} from '@fortawesome/free-solid-svg-icons';




// COMPONENT
export default function SinglePost(){
    const [, dispatch] = useStoreContext();

    const {postId} = useParams();  // UPDATE LATER re querying

    // Sample post content
    const
        title = 'Test title',
        username = 'testusername',
        borough = 'manhattan',
        dateCreated = 'Mar 9, 2018 at 6:21 AM',
        description = 'Test description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
    ;

    useEffect(
        () => {
            dispatch({
                type: SET_NAV_ACTIVE_PAGE,
                navActivePage: `${title} (posted by ${username})`
        });
        },
        []
    );

    // UPDATE LATER: Only set up all editing-post-related stuff below if the original post-er is currently logged in
    const [editPost, setEditPost] = useState(false);
    const [editedPostData, setEditedPostData] = useState({
        title,
        description
    });


    function handleEditedPostChange({target}){
        const updatedPostData = {...editedPostData};
        updatedPostData[target.name] = target.value;
        setEditedPostData(updatedPostData);
    }

    function handleEditPostFormSubmit(){  // UPDATE LATER
        editedPostData.title = editedPostData.title.trim();
        editedPostData.description = editedPostData.description.trim();

        if (editedPostData.title && editedPostData.description){
            alert(`Ready to submit updated post data:
                Title: ${editedPostData.title}
                Description: ${editedPostData.description}

                *NOTE: (updating on screen won't happen yet, but it will when the GraphQL mutation is actually sent—
                make sure to set up the mutation with ApolloCache updating for the initial query on this page!)
            `);

            setEditPost(false);
        }
    }


    return <>
        {/* UPDATE LATER: Only render this form in the first place if original post-er is currently logged in */}
        <form id='edit-post-form' className={editPost ? '' : 'd-none'} onSubmit={handleEditPostFormSubmit}>
            <div className='title-editor form-floating'>
                <input
                    className="form-control form-control-sm"
                    id='post-title-editable'
                    name='title'
                    placeholder="Enter updated post title"
                    value={editedPostData.title}
                    onChange={handleEditedPostChange}
                    required
                />
                <label htmlFor="post-title-editable">Title</label>
            </div>

            <div className='description-editor form-floating'>
                <textarea
                    className='form-control'
                    id='post-description-editable'
                    name='description'
                    placeholder='Enter updated post description'
                    value={editedPostData.description}
                    onChange={handleEditedPostChange}
                    style={{height: '200px'}}
                    required
                />
                <label htmlFor='post-description-editable'>Description</label>
            </div>

            <div className='edit-post-btns-wrapper'>
                <button className='update-post-btn btn btn btn-success' type='submit' form='edit-post-form'>Update</button>
                <button className='cancel-edit-post-btn'></button>
            </div>
        </form>

        <div className={`post-content ${editPost ? 'd-none' : ''}`} >
            <div className='post-title-and-delete-wrapper'>
                <h3 className='post-title d-inline-block'>{title}</h3>

                {/* UPDATE LATER: only render btns + modal if original post-er is logged in */}
                <div className='post-btns-wrapper d-inline-block'>
                    <button
                        className='edit-btn btn'
                        onClick={() => setEditPost(true)}
                    >
                        <FontAwesomeIcon icon={faPenNib} />
                    </button>

                    <DeletePostBtnAndModal postId={postId} returnToHome={true} />
                </div>
            </div>
            

            <p className='post-meta'>
                Posted by{' '}
                <Link to={`/user/${username}`}>{username}</Link>{' '}
                <span>{'('}{capitalizeEachWord(borough)}{')'}</span>{' '}
                on{' '}<span>{dateCreated}</span>
            </p>

            <p className='description'>{description}</p>
        </div>

        <div className='comments-wrapper'>
            <div className='comments'>
                {/* Sample comments and replies */}
                {/* UPDATE LATER:
                    If the original poster is logged in, query all comments;
                    otherwise, only query/display comments for which the commenter is the user who's logged in
                    (and if nobody's logged in, don't show any comments; instead, show a message like 'Log in to comment and communicate with {username} about this item')
                */}
                <div className='comment-and-reply-wrapper'>
                    <Comment
                        commentId={20063}
                        commenterUsername={'testuser091'}
                        origPostUsername={username}
                        content={'This is another test comment'}
                        dateCreated={'Jun 24, 2016 at 1:46 PM'}
                    />

                    <Reply
                        commentId={20063}
                        replyId={125}
                        replierUsername={username}
                        content={'Hey testuser091, thanks for writing—should we meet?'}
                        dateCreated={'Jun 25, 2016 at 2:12 PM'}
                    />

                    <Reply
                        commentId={20063}
                        replyId={126}
                        replierUsername={username}
                        content={"I can come towards you if you're down"}
                        dateCreated={'Jun 25, 2016 at 2:15 PM'}
                    />

                    <Reply
                        commentId={20063}
                        replyId={127}
                        replierUsername={'testuser091'}
                        content={"Hey, great, let's do it! My number is 212-449-6831, shoot me a text"}
                        dateCreated={'Jun 26, 2016 at 8:30 AM'}
                    />

                    <NewReply
                        commentId={20063}
                        otherUsername={username}
                    />
                </div>

                <div className='comment-and-reply-wrapper'>
                    <Comment
                        commentId={20067}
                        commenterUsername={'testuser229'}
                        origPostUsername={username}
                        content={'This is a test comment'}
                        dateCreated={'Jun 8, 2012 at 10:01 PM'}
                    />
                </div>
            </div>

            <ResultsSelector totalPages={11} name={'comments'} /> {/* UPDATE LATER */}
            
            {/* UPDATE LATER: only show `NewComment` if a user is logged in, and that user is NOT the original post-er */}
            <NewComment postUsername={username} />
        </div>
    </>;
}
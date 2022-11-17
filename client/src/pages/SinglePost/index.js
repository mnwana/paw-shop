
// IMPORTS
import {useParams, Link} from 'react-router-dom';

import {useEffect} from 'react';
import {useStoreContext} from '../../utils/GlobalState';
import {SET_NAV_ACTIVE_PAGE} from '../../utils/actions';

import {useState} from 'react';

import {useQuery} from '@apollo/client';
import {QUERY_POST} from '../../utils/queries';
import {ADD_COMMENT} from '../../utils/mutations'

import Auth from '../../utils/auth';

import {capitalizeEachWord} from '../../utils/helpers';

import DeletePostBtnAndModal from '../../components/DeletePostBtnAndModal';
import Comment from '../../components/Comment';
import Reply from '../../components/Reply';
import NewReply from '../../components/NewReply';
import ResultsSelector from '../../components/ResultsSelector';
import NewComment from '../../components/NewComment';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenNib} from '@fortawesome/free-solid-svg-icons';

import './index.css'



// COMPONENT
export default function SinglePost(){
    let loggedInUsername = null;
    if (Auth.loggedIn())
        loggedInUsername = Auth.getProfile().data.username;

    const [, dispatch] = useStoreContext();

    const {postId} = useParams();

    const {data, loading} = useQuery(QUERY_POST, {
        variables: {id: postId}
    });

    

    // Sample post content
    // const
    //     title = 'Test title',
    //     username = 'testusername',
    //     dateCreated = 'Mar 9, 2018 at 6:21 AM',
    //     postText = 'Test description lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'
    // ;

    useEffect(
        () => {
            if (data)
                dispatch({
                    type: SET_NAV_ACTIVE_PAGE,
                    navActivePage: `${data.post.title} (posted by ${data.post.user.username})`
        });
        },
        [data, loading]
    );

    // UPDATE LATER: Only set up all editing-post-related stuff below if the original post-er is currently logged in
    const [editPost, setEditPost] = useState(false);
    // const [editedPostData, setEditedPostData] = useState({
    //     title,
    //     description
    // });


    // function handleEditedPostChange({target}){
    //     const updatedPostData = {...editedPostData};
    //     updatedPostData[target.name] = target.value;
    //     setEditedPostData(updatedPostData);
    // }

    // function handleEditPostFormSubmit(){  // UPDATE LATER
    //     editedPostData.title = editedPostData.title.trim();
    //     editedPostData.description = editedPostData.description.trim();

    //     if (editedPostData.title && editedPostData.description){
    //         alert(`Ready to submit updated post data:
    //             Title: ${editedPostData.title}
    //             Description: ${editedPostData.description}

    //             *NOTE: (updating on screen won't happen yet, but it will when the GraphQL mutation is actually sent—
    //             make sure to set up the mutation with ApolloCache updating for the initial query on this page!)
    //         `);

    //         setEditPost(false);
    //     }
    // }

    
    if (loading)
        return <h2>Loading…</h2>;

    
    console.log(data);

    const {
        title,
        user: {username},
        createdAt: dateCreated,
        postText: description,
        animalType,
        category,
        condition,
        comments
    } = data.post;
    


    return <>
        {/* UPDATE LATER: Only render this form in the first place if original post-er is currently logged in */}
        {/* <form id='edit-post-form' className={editPost ? 'd-flex flex-column w-75 mb-3' : 'd-none'} onSubmit={handleEditPostFormSubmit}>
            <div className='title-editor form-floating mb-2 w-75 mx-auto'>
                <input
                    className="form-control"
                    id='post-title-editable'
                    name='title'
                    placeholder="Enter updated post title"
                    value={editedPostData.title}
                    onChange={handleEditedPostChange}
                    required
                />
                <label htmlFor="post-title-editable">Title</label>
            </div>

            <div className='description-editor form-floating mb-2'>
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

            <div className='edit-post-btns-wrapper d-flex justify-content-center mt-1'>
                <button className='update-post-btn btn submit-btn mx-2 hover-opacity' type='submit' form='edit-post-form'>Update</button>
                <button className='cancel-edit-post-btn btn mx-2 hover-opacity'>Cancel</button>
            </div>
        </form> */}

        <div className={`post-content ${editPost ? 'd-none' : ''} border border-dark rounded px-3 pt-3 w-100`} >
            <div className='post-title-and-btns-and-meta-wrapper text-center d-flex flex-wrap justify-content-between align-items-center mb-3'>
                <div className='post-title-and-btns-wrapper mx-2 mb-1'>
                    <h3 className='post-title d-inline-block mb-1'>{title}</h3>

                    {/* UPDATE LATER: only render btns + modal if original post-er is logged in */}
                    {/* <span className='post-btns-wrapper d-inline-block'>
                        <button
                            className='edit-btn btn ps-2 pe-1 py-0 hover-opacity'
                            onClick={() => setEditPost(true)}
                        >
                            <FontAwesomeIcon icon={faPenNib} />
                        </button>

                        <DeletePostBtnAndModal postId={postId} returnToHome={true} />
                    </span> */}
                </div>

                <p className='post-meta mb-1 mx-2 fst-italic text-start'>
                    Posted by{' '}
                    {/* <span className='username-meta hover-opacity'>
                        <Link to={`/user/${username}`}>{username}</Link>{' '}
                    </span> */}
                    <span>{username}{' '}</span>
                    {/* <span>{'('}{capitalizeEachWord(borough)}{')'}</span>{' '} */}
                    on{' '}<span>{dateCreated}</span>
                </p>
            </div>

            <p className='post-description text-start px-3 px-md-4'>{description}</p>
        </div>

        <div className={`comments-wrapper d-flex flex-column border border-dark rounded px-3 pt-4 ${editPost ? '' : 'border-top-0'}`}>
            <div className='comments'>
                {/* Sample comments and replies */}
                {/* UPDATE LATER:
                    If the original poster is logged in, query all comments;
                    otherwise, only query/display comments for which the commenter is the user who's logged in
                    (and if nobody's logged in, don't show any comments; instead, show a message like 'Log in to comment and communicate with {username} about this item')
                */}
                    {comments.map(comment => loggedInUsername === username || loggedInUsername === comment.user.username     ? 
                        <div className='comment-and-replies-wrapper px-3 mb-3 rounded' key={comment._id}>
                            <Comment
                                commentId={comment._id}
                                commenterUsername={comment.user.username}
                                origPostUsername={username}
                                content={comment.commentBody}
                                dateCreated={comment.createdAt}
                                dateUpdated={comment.updatedAt}
                            />

                            <div className='replies-wrapper mx-5'>
                                {comment.replies.map(reply => 
                                    <Reply
                                        commentId={comment._id}
                                        replyId={reply._id}
                                        replierUsername={reply.user.username}
                                        content={reply.replyBody}
                                        dateCreated={reply.createdAt}
                                        key={reply._id}
                                    />
                                )}

                                <NewReply
                                    commentId={comment._id}
                                    otherUsername={username === loggedInUsername ? comment.user.username : username}
                                />
                            </div>
                        </div>
                    :
                        <></>
                    )}
            </div>

            {/* <ResultsSelector totalPages={11} name={'comments'} /> */}
            {/* UPDATE LATER: Only show if the logged-in user is the original post-er */}
            
            {loggedInUsername ?
                loggedInUsername === username ?
                    <></>
                :
                    <NewComment postUsername={username} />
            :
                <p className='text-center fs-5'>
                    <span
                        className='login-link fs-5 p-0 m-0 hover-opacity'
                        data-bs-toggle='modal'
                        data-bs-target='#login-signup-modal'
                    >
                        Log in
                    </span>{' '}
                    to message with <i>{username}</i> about this item
                </p>
            }
        </div>
    </>;
}
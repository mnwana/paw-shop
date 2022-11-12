
// IMPORT
import {useState} from 'react';
import {Navigate} from 'react-router-dom';

// COMPONENT
export default function PostInfo({postId, name, animalType, category, username = null, dateCreated, active}){
    const [postJustClicked, setPostJustClicked] = useState(false);

    if (postJustClicked){
        alert(`Geting ready to navigate to /post/${postId}`);  // UPDATE LATER
        return <Navigate to={`/post/${postId}`} />
    }

    function handleFilterClick(){  // UPDATE LATER
        alert(`Update filter view according to:
            Animal type: ${animalType}
            Category: ${category}
        `);        
    }

    return <div className={`post ${active ? 'active' : 'inactive'} mb-3`}>
        <div className="d-flex justify-content-between">
            <button onClick={() => setPostJustClicked(true)}>
                {name}
                </button>
            <span>
                in{' '}
                <button onClick={handleFilterClick}>{animalType} <b>•</b> {category}</button>
            </span>
        </div>
        <br />
        Posted {username ? <>by <a>{username}</a> </> : <></>}on <span>{dateCreated}</span>
    </div>;
}
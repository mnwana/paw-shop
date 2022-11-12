
// IMPORTS
import {useState} from 'react';

import {Navigate} from 'react-router-dom';

import $ from 'jquery';
import {kebabify, capitalize} from '../../utils/helpers';


// COMPONENT
export default function PostInfo({postId, name, animalType, category, username = null, dateCreated, watchCount, active}){
    const [postJustClicked, setPostJustClicked] = useState(false);


    if (postJustClicked){
        alert(`Geting ready to navigate to /post/${postId}`);  // UPDATE LATER
        return <Navigate to={`/post/${postId}`} />
    }


    function handleFilterClick(){
        $('.select-none-btn[group="animal type"]').trigger('click');
        $('.select-none-btn[group="category"]').trigger('click');

        $(`#${kebabify(animalType)}-selector`).trigger('click');
        $(`#${kebabify(category)}-selector`).trigger('click');
    }


    return <div className={`post ${active ? 'active' : 'inactive'} mb-3`}>
        <div className="d-flex justify-content-between">
            <button onClick={() => setPostJustClicked(true)}>
                {name}
                </button>
            <span>
                in{' '}
                <button className='update-filter-view-btn' onClick={handleFilterClick}>{capitalize(animalType)} <b>•</b> {capitalize(category)}</button>
            </span>
        </div>

        <br />

        <div className='d-flex justify-content-between'>
            <span>
                Posted {username ? <>by <a>{username}</a> </> : <></>}on <span>{dateCreated}</span>
            </span>

            <span>
                Being watched by {watchCount} user{watchCount === 1 ? '' : 's'}
            </span>
        </div>
    </div>;
}

// IMPORTS
import {useState} from 'react';

import {Navigate} from 'react-router-dom';

import $ from 'jquery';
import {kebabify, capitalize} from '../../utils/helpers';

import './index.css';



// COMPONENT
export default function PostInfo({
    postId,
    name,
    animalType = null,
    category = null,
    username = null,
    dateCreated = null,
    watchCount,
    toggleBtn = true,
    active
}){
    const [postJustClicked, setPostJustClicked] = useState(false);


    if (postJustClicked){
        alert(`Geting ready to navigate to /post/${postId}`);  // UPDATE LATER
        return <Navigate to={`/post/${postId}`} />
    }


    function getWatchCountText(){
        if (active)
            return watchCount === 0 ?
                'Not being watched by any users'
            :
                `Being watched by ${watchCount} user${watchCount === 1 ? '' : 's'}`
            
        return '';
    }


    function handleFilterClick(){
        $('.select-none-btn[group="animal type"]').trigger('click');
        $('.select-none-btn[group="category"]').trigger('click');

        $(`#${kebabify(animalType)}-selector`).trigger('click');
        $(`#${kebabify(category)}-selector`).trigger('click');
    }


    return <div className={`post-info ${active ? 'active' : 'inactive'} mb-3`}>
        <div className="first-row d-flex justify-content-between">
            <button className='item-name' onClick={() => setPostJustClicked(true)}>
                {name}
            </button>

            {animalType && category ?
                <span>
                    in{' '}
                    <button className='update-filter-view-btn' onClick={handleFilterClick}>{capitalize(animalType)} <b>•</b> {capitalize(category)}</button>
                </span>
            :
                dateCreated && toggleBtn ?
                    <button className='active-inactive-toggle-btn btn btn-primary'>
                        {active ? 'Deactivate' : 'Reactivate'}
                    </button>
                :
                    getWatchCountText()
            }
        </div>

        {(animalType && category) || dateCreated ? <br /> : <></>}

        <div className='second-row d-flex justify-content-between'>
            {dateCreated ?
                <span>
                    Posted {username ? <>by <a>{username}</a> </> : <></>}on <span>{dateCreated}</span>
                </span>
            :
                <></>
            }

            {(animalType && category) || dateCreated ?
                <span>{getWatchCountText()}</span>
            :
                <></>
            }
        </div>
    </div>;
}
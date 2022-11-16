
// IMPORTS
import {Link} from 'react-router-dom';

import {useStoreContext} from '../../utils/GlobalState';
import {FILTER_SET_ONE} from '../../utils/actions';

import DeletePostBtnAndModal from '../DeletePostBtnAndModal';

import $ from 'jquery';
import {kebabify, capitalize, capitalizeEachWord, abbreviate} from '../../utils/helpers';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownLong, faUpLong} from '@fortawesome/free-solid-svg-icons';

import './index.css';




// COMPONENT
export default function PostInfo({
    postId,
    title,
    animalType = null,
    category = null,
    username = null,
    borough = null,
    dateCreated = null,
    watchCount,
    toggleBtn = false,
    active,
    showDeleteBtn = false
}){
    const [, dispatch] = useStoreContext();


    function getWatchCountText(){
        if (active)
            return watchCount === 0 ?
                'Not being watched by any users'
            :
                `Being watched by ${watchCount} user${watchCount === 1 ? '' : 's'}`
            
        return '';
    }


    async function handleFilterClick(){
        $('.select-none-btn[group="animal type"]').trigger('click');
        $('.select-none-btn[group="category"]').trigger('click');

        /* The two click events below don't automatically trigger the `dispatch`es that follow (via `FilterGroup`),
            likely because triggering a click event via jQuery (or even native JS) doesn't actually trigger a click event
            on HTML <input>s INSIDE OF REACT--it does on <button>s, thus the two `.select-none-btn` click events above do
            trigger their corresponding `dispatch`es--therefore, the `dispatch`es below MUST be called manually here
        */
        $(`#${kebabify(animalType)}-selector`).trigger('click');
        $(`#${kebabify(category)}-selector`).trigger('click');
        
        await dispatch({
            type: FILTER_SET_ONE,
            group: 'animal type',
            element: animalType,
            newCheckedState: true
        });
        await dispatch({
            type: FILTER_SET_ONE,
            group: 'category',
            element: category,
            newCheckedState: true
        });

        $('#apply-btn').trigger('click');
    }


    function handleToggleActiveStatus(){  // UPDATE LATER
        alert(`This post is currently ${active ? '' : 'in'}active;
        getting ready to toggle it to ${active ? 'in' : ''}active`);
    }


    return <div
        id={`post-info-${postId}`}
        className={`post-info ${active ? 'active' : 'inactive'} border border-dark rounded p-2 mb-3`}
    >
        <div className="first-row d-flex align-items-center justify-content-between">
            <div className={`post-title-${showDeleteBtn ? 'and-delete-btn-' : ''}wrapper`}>
                <Link className='d-inline-block' to={`/post/${postId}`}>
                    <button className='post-info-title btn px-2 me-2'>
                        {abbreviate(title)}
                    </button>
                </Link>
                {showDeleteBtn ?
                    <DeletePostBtnAndModal postId={postId} returnToHome={false} />
                :
                    <></>
                }
            </div>

            {animalType && category ?
                <span className='update-filter-view d-flex align-items-center flex-nowrap'>
                    in&nbsp;&nbsp;
                    <button
                        className='update-filter-view-btn btn submit-btn hover-opacity'
                        onClick={handleFilterClick}
                    >
                        {capitalize(animalType)} <b>•</b> {capitalize(category)}
                    </button>
                </span>
            : dateCreated ?
                toggleBtn ?
                    <button className={`${active ? 'deactivate' : 'reactivate'}-btn btn hover-opacity`} onClick={handleToggleActiveStatus}>
                        {active ?
                            <>Deactivate <FontAwesomeIcon icon={faDownLong} /></>
                        :
                            <>Reactivate <FontAwesomeIcon icon={faUpLong} /></>
                        }
                    </button>
                :
                    <></>
            :
                <span className='fst-italic'>{getWatchCountText()}</span>
            }
        </div>

        {(animalType && category) || dateCreated ? <p></p> : <></>}

        <div className='post-meta d-flex justify-content-between fst-italic'>
            {dateCreated ?
                <p className='text-start mb-0 me-2'>
                    Posted{' '}
                    {username && borough ?
                        <>
                            by{' '}
                            <Link className='username-meta hover-opacity' to={`/user/${username}`}>{username}</Link>{' '}
                            <span>{'('}{capitalizeEachWord(borough)}{')'}</span>{' '}
                        </>
                    :
                        <></>
                    }
                    on <span>{dateCreated}</span>
                </p>
            :
                <></>
            }

            {(animalType && category) || dateCreated ?
                <p className='text-end mb-0 ms-2'>{getWatchCountText()}</p>
            :
                <></>
            }
        </div>
    </div>;
}
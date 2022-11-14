
// IMPORTS
import {Link} from 'react-router-dom';

import {useStoreContext} from '../../utils/GlobalState';
import {FILTER_SET_ONE} from '../../utils/actions';

import DeletePostBtnAndModal from '../DeletePostBtnAndModal';

import $ from 'jquery';
import {kebabify, capitalize, capitalizeEachWord, abbreviate} from '../../utils/helpers';

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


    return <div id={`post-info-${postId}`} className={`post-info ${active ? 'active' : 'inactive'} mb-3`}>
        <div className="first-row d-flex justify-content-between">
            <div className={`post-title-${showDeleteBtn ? 'and-delete-btn-' : ''}wrapper`}>
                <Link className='d-inline-block' to={`/post/${postId}`}>
                    <button className='post-info-title'>
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
                <span>
                    in{' '}
                    <button className='update-filter-view-btn' onClick={handleFilterClick}>{capitalize(animalType)} <b>•</b> {capitalize(category)}</button>
                </span>
            : dateCreated ?
                toggleBtn ?
                    <button className='active-inactive-toggle-btn btn btn-primary'>
                        {active ? 'Deactivate' : 'Reactivate'}
                    </button>
                :
                    <></>
            :
                getWatchCountText()
            }
        </div>

        {(animalType && category) || dateCreated ? <br /> : <></>}

        <div className='second-row d-flex justify-content-between'>
            {dateCreated ?
                <span>
                    Posted{' '}
                    {username && borough ?
                        <>
                            by{' '}
                            <Link to={`/user/${username}`}>{username}</Link>{' '}
                            <span>{'('}{capitalizeEachWord(borough)}{')'}</span>{' '}
                        </>
                    :
                        <></>
                    }
                    on <span>{dateCreated}</span>
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
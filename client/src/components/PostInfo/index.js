
// IMPORTS
import {Link} from 'react-router-dom';

import {useStoreContext} from '../../utils/GlobalState';
import {FILTER_SET_ONE} from '../../utils/actions';

import $ from 'jquery';
import {kebabify, capitalize, abbreviate} from '../../utils/helpers';

import './index.css';



// COMPONENT
export default function PostInfo({
    postId,
    name,
    animalType = null,
    category = null,
    username = null,
    userId = null,
    dateCreated = null,
    watchCount,
    toggleBtn = false,
    active
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


    return <div className={`post-info ${active ? 'active' : 'inactive'} mb-3`}>
        <div className="first-row d-flex justify-content-between">
            <Link to={`/post/${postId}`}>
                <button className='item-name'>
                    {abbreviate(name)}
                </button>
            </Link>

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
                    {username && userId ?
                        <>by <Link to={`/user/${userId}`}>{username}</Link>{' '}</>
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
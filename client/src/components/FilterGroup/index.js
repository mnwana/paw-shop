
// IMPORTS
import $ from 'jquery';

import {kebabify, capitalize, capitalizeEachWord} from '../../utils/helpers';

import {useStoreContext} from '../../utils/GlobalState';
import {FILTER_SET_ONE, FILTER_SELECT_ALL, FILTER_SELECT_NONE} from '../../utils/actions';

import './index.css';



// COMPONENT
export default function FilterGroup({group, elements}){
    const [, dispatch] = useStoreContext();


    async function handleSelectAll({target}){
        $(`input[group="${$(target).attr('group')}"]`)
            .prop('checked', true);
            
        await dispatch({
            type: FILTER_SELECT_ALL,
            group: $(target).attr('group')
        });
    }

    async function handleSelectNone({target}){
        $(`input[group="${$(target).attr('group')}"]`)
            .prop('checked', false);
        
        await dispatch({
            type: FILTER_SELECT_NONE,
            group: $(target).attr('group')
        });
    }

    
    async function handleToggleOne({target}){
        await dispatch({
                type: FILTER_SET_ONE,
                group: $(target).attr('group'),
                element: $(target).attr('name'),
                newCheckedState: $(target).prop('checked')
        });
    }

    
    return <>
        <div
            className="filter-group btn-group d-flex flex-column mt-2"
            name={group}
            role={group}
            aria-label={`${group} filter group`}
        >
            <h6 className='filter-group-name mb-1 ms-2'>{capitalize(group)}</h6>

            <div className="select-all-none-btns-wrapper mb-1">
                <button className="select-all-btn btn btn-sm mx-2 mb-1 hover-opacity" group={group} onClick={handleSelectAll}>Select all</button>
                <button className="select-none-btn btn btn-sm mx-2 mb-1 hover-opacity" group={group} onClick={handleSelectNone}>Deselect all</button>
            </div>
            
            <div className="elements-wrapper d-flex justify-content-start ms-md-1 flex-wrap" group={group}>
                {elements.map(({name, checked}) => (
                    <div className="filter-element" key={name}>
                        <input
                            type="checkbox"
                            className="btn-check"
                            name={name}
                            group={group}
                            id={`${kebabify(name)}-selector`}
                            onClick={handleToggleOne}
                            defaultChecked={checked}
                        />

                        <label className="btn btn-sm mx-1 mb-1 hover-opacity" htmlFor={`${kebabify(name)}-selector`} aria-label={`${name} selector`}>
                            {group === 'borough' ? capitalizeEachWord(name) : capitalize(name)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    </>;
}
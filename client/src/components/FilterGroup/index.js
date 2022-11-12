
// IMPORTS
import $ from 'jquery';

import {kebabify, capitalize} from '../../utils/helpers';

import {useStoreContext} from '../../utils/GlobalState';
import {FILTER_SET_ONE, FILTER_SELECT_ALL, FILTER_SELECT_NONE} from '../../utils/actions';



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

    
    return (
        <div className="filter-group btn-group" name={group} role={group} aria-label={`${group} filter group`}>
            <h5>{capitalize(group)}</h5>

            <div className="select-all-none-btns-wrapper">
                <button className="select-all-btn btn btn-warning" group={group} onClick={handleSelectAll}>Select all</button>
                <button className="select-none-btn btn btn-warning" group={group} onClick={handleSelectNone}>Select none</button>
            </div>
            
            <div className="elements-wrapper d-flex" group={group}>
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

                        <label className="btn btn-outline-primary" htmlFor={`${kebabify(name)}-selector`} aria-label={`${name} selector`}>
                            {capitalize(name)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
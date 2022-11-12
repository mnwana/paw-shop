
// IMPORT
import $ from 'jquery';
import FilterGroup from '../FilterGroup';
import {useStoreContext} from '../../utils/GlobalState';


// COMPONENT
export default function FilterPanel(){
    let [{filterState}] = useStoreContext();

    
    function handleClearAll(){
        $('.select-none-btn').trigger('click');
    }
    

    function handleApply(){  // UPDATE LATER
        const output = ['Getting ready to apply this filter state:', ''];
        let atLeastOneChecked = false;

        for (const group of filterState)
            for (const element of group.elements){
                if (!atLeastOneChecked && element.checked)
                    atLeastOneChecked = true;
                output.push(`Name: ${element.name}   ||   Checked: ${element.checked}`);
            }

        alert(atLeastOneChecked ? output.join('\n') : 'At least one filter field must be checked!');
    }


    return (
        <div className="filter-panel">
            <div className='global-filter-btns-wrapper'>
                <button className='apply-btn btn btn-success' onClick={handleApply}>Apply</button>
                <button className='clear-all-btn btn btn-info' onClick={handleClearAll}>Clear all</button>
            </div>

            {filterState.map(({group, elements}) => <FilterGroup group={group} elements={elements} key={group}/>)}
        </div>
    );
}
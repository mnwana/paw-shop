
// IMPORTS
import $ from 'jquery';

import FilterGroup from '../FilterGroup';
import ResultsSelector from '../ResultsSelector';

import {useStoreContext} from '../../utils/GlobalState';



// COMPONENT
export default function FilterPanel(){
    let [{filterState}] = useStoreContext();

    
    function handleClearAll(){
        $('.select-none-btn').trigger('click');
    }
    

    function handleApply(){  // UPDATE LATER
        const output = ['Getting ready to apply this filter state:', ''];

        for (const group of filterState){
            for (const element of group.elements){
                output.push(`${element.name}   ||   ${element.checked}`);
            }
            output.push('');
        }

        output.push('(*NOTE: A query with all `false`s should be treated the same as a query with all `true`s by GraphQL)');

        alert(output.join('\n'));
    }


    return (
        <div className="filter-panel d-flex flex-column">
            <div className='global-filter-btns-wrapper'>
                <button id='apply-btn' className='btn btn-success' onClick={handleApply}>Apply</button>
                <button id='clear-all-btn' className='btn btn-info' onClick={handleClearAll}>Clear all</button>
            </div>

            {filterState.map(({group, elements}) => <FilterGroup group={group} elements={elements} key={group}/>)}

            <ResultsSelector totalPages={7} /> {/* UPDATE LATER */}
        </div>
    );
}
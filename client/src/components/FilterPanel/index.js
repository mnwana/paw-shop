
// IMPORTS
import $ from 'jquery';

import FilterGroup from '../FilterGroup';

import {useStoreContext} from '../../utils/GlobalState';



// COMPONENT
export default function FilterPanel(){
    let [{filterState}] = useStoreContext();

    
    function handleClearAll(){
        $('.select-none-btn').trigger('click');
    }
    

    async function handleApply(){  // UPDATE LATER
        // If a given filter group has none selected, select all in that group right now, before actually applying this filter
        // (`await` here ensures that the `globalState` dispatch triggered by the jQuery click below has time to fully update `filterState` before the code proceeds)
        await filterState.forEach(
            ({group, elements}) => {
                let atLeastOneSelected = false;
                for (let i = 0; i < elements.length; i++){
                    if (elements[i].checked){
                        atLeastOneSelected = true;
                        break;
                    }
                }

                if (!atLeastOneSelected){
                    $(`.select-all-btn[group="${group}"]`).trigger('click');
                }
            }
        );

        $('.results-selector .first-page-selector').trigger('click');

        const output = ['Getting ready to apply this filter state:', ''];
        for (const group of filterState){
            for (const element of group.elements){
                output.push(`${element.name}   ||   ${element.checked}`);
            }
            output.push('');
        }

        console.log(output.join('\n'));
        alert("Check the console for details on the `filterState` that's ready to send to a GraphQL query");
    }


    return (
        <div className="filter-panel d-flex flex-column">
            <div className='global-filter-btns-wrapper'>
                <button id='apply-btn' className='btn btn-success' onClick={handleApply}>Apply</button>
                <button id='clear-all-btn' className='btn btn-info' onClick={handleClearAll}>Clear all</button>
            </div>

            {filterState.map(({group, elements}) => <FilterGroup group={group} elements={elements} key={group}/>)}
        </div>
    );
}
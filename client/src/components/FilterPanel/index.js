
// IMPORTS
import $ from 'jquery';

import FilterGroup from '../FilterGroup';

import {useLazyQuery} from '@apollo/client';
import {FILTERED_POSTS} from '../../utils/queries';

import {useStoreContext} from '../../utils/GlobalState';

import {camelCase} from '../../utils/helpers';

import './index.css';



// COMPONENT
export default function FilterPanel(){
    let [{filterState}] = useStoreContext();

    // const [updatedFilteredPosts, {data}] = useLazyQuery(FILTERED_POSTS);

    
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

        const filterStateRefactored = {};
        for (const group of filterState){
            filterStateRefactored[camelCase(group.group)] = [];
            for (const element of group.elements)
                if (element.checked)
                    filterStateRefactored[camelCase(group.group)].push(element.name);
        }

        // await updatedFilteredPosts({
        //     variables: {
        //         filterState: filterStateRefactored
        //     }
        // });
    }



    return <>
        <div className="filter-panel col-12 col-md-3 d-flex flex-column py-3 mb-5 mb-md-1 border border-dark rounded">
            <div className='global-filter-btns-wrapper d-flex flex-wrap justify-content-start'>
                {/* <button id='apply-btn' className='btn btn-sm submit-btn mb-1 mx-2 hover-opacity' onClick={handleApply}>Apply</button> */}
                <button id='clear-all-btn' className='btn btn-sm mb-1 mx-2 hover-opacity' onClick={handleClearAll}>Clear all</button>
            </div>

            {filterState.map(({group, elements}) => <FilterGroup group={group} elements={elements} key={group}/>)}
        </div>
    </>;
}

// IMPORT
import FilterGroup from '../FilterGroup';
import {useStoreContext} from '../../utils/GlobalState';


// COMPONENT
export default function FilterPanel(){
    let [{filterState}] = useStoreContext();

    return (
        <div className="filter-panel">
            {filterState.map(({group, elements}) => <FilterGroup group={group} elements={elements} key={group}/>)}
        </div>
    );
}
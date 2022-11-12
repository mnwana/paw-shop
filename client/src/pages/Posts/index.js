
// IMPORT
import FilterPanel from '../../components/FilterPanel';
import PostInfo from '../../components/PostInfo';



// COMPONENT
export default function Posts(){
    return <>
        <FilterPanel />
        
        <PostInfo
            name={'Test name'}
            category={'Test category'}
            username={'testusername'}
            dateCreated={'Aug 12, 2015 at 5:57 PM'}
            active={true}
        />
    </>;
}
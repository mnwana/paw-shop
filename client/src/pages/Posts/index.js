
// IMPORT
import FilterPanel from '../../components/FilterPanel';
import PostInfo from '../../components/PostInfo';



// COMPONENT
export default function Posts(){
    return <>
        <FilterPanel />
        
        <PostInfo
            postId={123123}
            name={'Test name'}
            animalType={'Rabbit / hamster'}
            category={'Furniture'}
            username={'testusername'}
            dateCreated={'Aug 12, 2015 at 5:57 PM'}
            active={true}
        />
    </>;
}
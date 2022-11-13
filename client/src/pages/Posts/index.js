
// IMPORTS
import FilterPanel from '../../components/FilterPanel';
import PostInfo from '../../components/PostInfo';


// COMPONENT
export default function Posts(){
    return <>
        <FilterPanel />
        
        <div className='posts-wrapper'>
            {/* Sample active post */}
            <PostInfo
                postId={123123}
                name={'Test name, long, so therefore abbreviated'}
                animalType={'rabbit / hamster'}
                category={'furniture'}
                username={'testusername'}
                userId={2077}
                dateCreated={'Aug 12, 2015 at 5:57 PM'}
                watchCount={17}
                active={true}
            />
        </div>
    </>;
}
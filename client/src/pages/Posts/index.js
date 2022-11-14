
// IMPORTS
import FilterPanel from '../../components/FilterPanel';
import PostInfo from '../../components/PostInfo';
import ResultsSelector from '../../components/ResultsSelector';


// COMPONENT
export default function Posts(){
    return <>
        <FilterPanel />
        
        <div className='posts-wrapper'>
            {/* Sample active post */}
            <PostInfo
                postId={123123}
                title={'Test title, long, so therefore abbreviated'}
                animalType={'rabbit / hamster'}
                category={'furniture'}
                username={'testusername'}
                borough={'manhattan'}
                dateCreated={'Aug 12, 2015 at 5:57 PM'}
                watchCount={17}
                active={true}
            />
        </div>

        <ResultsSelector totalPages={7} /> {/* UPDATE LATER */}
    </>;
}
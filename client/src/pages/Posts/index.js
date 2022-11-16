
// IMPORTS
import FilterPanel from '../../components/FilterPanel';
import PostInfo from '../../components/PostInfo';
import ResultsSelector from '../../components/ResultsSelector';


// COMPONENT
export default function Posts(){
    return <div className='container-fluid mx-0'>
        <div className='row'>
            <FilterPanel />
            
            <div className='posts-content-wrapper col-12 col-md-9 px-lg-5 px-md-3'>
                {/* Sample active post */}
                <PostInfo
                    postId={123123}
                    title={'Test title, very, very, very, very, very, very, very, very long, so therefore abbreviated'}
                    animalType={'rabbit / hamster'}
                    category={'cleaning products'}
                    username={'testusername'}
                    borough={'manhattan'}
                    dateCreated={'Aug 12, 2015 at 5:57 PM'}
                    watchCount={17}
                    active={true}
                />

                <ResultsSelector totalPages={7} /> {/* UPDATE LATER */}
            </div>
        </div>
    </div>;
}
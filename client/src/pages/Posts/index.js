
// IMPORTS
import {useEffect} from 'react';

import FilterPanel from '../../components/FilterPanel';
import PostInfo from '../../components/PostInfo';
import ResultsSelector from '../../components/ResultsSelector';

import {useLazyQuery, useQuery} from '@apollo/client';
import {FILTERED_POSTS} from '../../utils/queries';

import {useStoreContext} from '../../utils/GlobalState';

import {camelCase} from '../../utils/helpers';


// COMPONENT
export default function Posts(){
    const [{filterState}] = useStoreContext();

    const filterStateRefactored = {};
    for (const group of filterState){
        filterStateRefactored[camelCase(group.group)] = [];
        for (const element of group.elements)
            if (element.checked)
                filterStateRefactored[camelCase(group.group)].push(element.name);
    }

    const {loading, data} = useQuery(FILTERED_POSTS, {
        variables: {filterState: filterStateRefactored}
    });

    // const [filteredPosts, {data}] = useLazyQuery(FILTERED_POSTS);

    // useEffect(
    //     () => {
    //         filteredPosts({
    //             variables: {filterState: filterStateRefactored}
    //         });
    //     },
    //     []
    // );

    // if (!data)
    if (loading)
        return <h2>Loading…</h2>;

    const posts = data.filteredPosts.posts;


    return <div className='container-fluid mx-0'>
        <div className='row'>
            <FilterPanel />
            
            <div className='posts-content-wrapper col-12 col-md-9 px-lg-5 px-md-3'>

                {posts.map(post => 
                    <PostInfo
                        postId={post._id}
                        title={post.title}
                        animalType={post.animalType}
                        category={post.category}
                        username={post.user.username}
                        borough={post.user.borough}
                        dateCreated={post.createdAt}
                        active={post.active}
                        key={post._id}
                    />    
                )}

                {/* <PostInfo
                    postId={123123}
                    title={'Test title, very, very, very, very, very, very, very, very long, so therefore abbreviated'}
                    animalType={'rabbit / hamster'}
                    category={'cleaning products'}
                    username={'testusername'}
                    borough={'manhattan'}
                    dateCreated={'Aug 12, 2015 at 5:57 PM'}
                    watchCount={17}
                    active={true}
                /> */}

                {/* <ResultsSelector totalPages={7} name={'posts'} /> */}  {/* UPDATE LATER */}
            </div>
        </div>
    </div>;
}
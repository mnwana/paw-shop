
// IMPORTS
import {useState} from "react";
import {capitalize} from "../../utils/helpers";

import {useStoreContext} from "../../utils/GlobalState";

import {useMutation} from '@apollo/client';
import {ADD_POST} from "../../utils/mutations";
import {FILTERED_POSTS} from '../../utils/queries';

import Auth from '../../utils/auth';

import './index.css';


// COMPONENT
export default function PostAnItem(){
    const [addPost] = useMutation(ADD_POST, {
        // update: (cache, {data: {addPost}}) => {
        //     cache.writeQuery({
        //       query: FILTERED_POSTS,
        //       data: {filteredPosts: {...addPost}}
        //     });
        // }
    });

    const [{filterState}] = useStoreContext();

    const animalTypes = filterState
        .find(({group}) => group === 'animal type')
        .elements.map(({name}) => name);

    const categories = filterState
        .find(({group}) => group === 'category')
        .elements.map(({name}) => name);

    const conditions = filterState
        .find(({group}) => group === 'condition')
        .elements.map(({name}) => name);


    const [newPostData, setNewPostData] = useState({
        title: '',
        description: '',
        animalType: animalTypes[0],
        category: categories[0],
        condition: conditions[0],
    });

    function handleChange({target}){
        const updatedPostData = {...newPostData};
        updatedPostData[target.getAttribute('name')] = target.value;
        setNewPostData(updatedPostData);
    }


    async function handleSubmit(e){
        e.preventDefault();

        newPostData.title = newPostData.title.trim();
        newPostData.description = newPostData.description.trim();

        if(newPostData.title && newPostData.description){
            try{
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token){
                    console.error('No user is logged in right now');
                    return false;
                  }

                console.log({...newPostData});

                await addPost(
                    {variables: {postData: {...newPostData}}}
                );

                document.location.assign('/posts');

                setNewPostData({
                    title: '',
                    description: ''
                });
            }catch (err){
                console.error(err);
            }
        }
    }

    return <>
        <div className="container-fluid">
            <form id='post-an-item-form' className="d-flex flex-column align-items-center mt-3" onSubmit={handleSubmit}>
                <div className="form-floating mb-4">
                    <input
                        className="form-control"
                        value={newPostData.title}
                        onChange={handleChange}
                        id="new-post-name"
                        name="title"
                        placeholder="Enter title"
                        required
                    />
                    <label htmlFor="new-post-title">Enter title</label>
                </div>

                <div className="form-floating mb-4">
                    <textarea
                        className="form-control"
                        value={newPostData.description}
                        onChange={handleChange}
                        id="new-post-description"
                        name="description"
                        placeholder="Enter description"
                        style={{height: '200px'}}
                        required />
                    <label htmlFor="new-post-description">Enter description</label>
                </div>

                <div className="new-post-groups-wrapper d-flex flex-wrap justify-content-between mb-2">
                    <div className='form-floating mb-2 mx-2'>
                        <select
                            className='form-select form-select-sm'
                            id='animal-type-selector'
                            aria-label='animal type selector'
                            name='animalType'
                            value={newPostData.animalType}
                            onChange={handleChange}
                        >
                            {animalTypes.map(animalType => 
                                <option value={animalType} key={animalType}>
                                    {capitalize(animalType)}
                                </option>
                            )}
                        </select>
                        <label htmlFor='animal-type-selector'>Animal type</label>
                    </div>

                    <div className='form-floating mb-2 mx-2'>
                        <select
                            className='form-select form-select-sm'
                            id='category-selector'
                            aria-label='category selector'
                            name='category'
                            value={newPostData.category}
                            onChange={handleChange}
                        >
                            {categories.map(category => 
                                <option value={category} key={category}>
                                    {capitalize(category)}
                                </option>
                            )}
                        </select>
                        <label htmlFor='category-selector'>Category</label>
                    </div>

                    <div className='form-floating mb-2 mx-2'>
                        <select
                            className='form-select form-select-sm'
                            id='condition-selector'
                            aria-label='condition selector'
                            name='condition'
                            value={newPostData.condition}
                            onChange={handleChange}
                        >
                            {conditions.map(condition => 
                                <option value={condition} key={condition}>
                                    {capitalize(condition)}
                                </option>
                            )}
                        </select>
                        <label htmlFor='condition-selector'>Condition</label>
                    </div>
                </div>

                <button className="btn submit-btn hover-opacity" type="submit" form="post-an-item-form">Post</button>
            </form>
        </div>
    </>;
}
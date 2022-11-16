
// IMPORTS
import {useState} from "react";

import './index.css';


// COMPONENT
export default function PostAnItem(){
    const [newPostData, setNewPostData] = useState({
        title: '',
        description: ''
    });

    function handleChange({target}){
        const updatedPostData = {...newPostData};
        updatedPostData[target.getAttribute('name')] = target.value;
        setNewPostData(updatedPostData);
    }

    function handleSubmit(e){
        e.preventDefault();

        newPostData.title = newPostData.title.trim();
        newPostData.description = newPostData.description.trim();

        if(newPostData.title && newPostData.description){
            alert(`New post submitted:
                Title: ${newPostData.title}
                Description: ${newPostData.description}
            `);

            setNewPostData({
                title: '',
                description: ''
            });
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

                <button className="btn submit-btn hover-opacity" type="submit" form="post-an-item-form">Post</button>
            </form>
        </div>
    </>;
}
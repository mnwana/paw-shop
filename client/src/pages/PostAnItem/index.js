
// IMPORT
import {useState} from "react";


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
        <form id='post-an-item-form' onSubmit={handleSubmit}>
            <div className="form-floating">
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

            <div className="form-floating">
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

            <button className="btn btn-primary" type="submit" form="post-an-item-form">Post</button>
        </form>
    </>;
}
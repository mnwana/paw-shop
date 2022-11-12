
// IMPORT
import {useState} from "react";


// COMPONENT
export default function PostAnItem(){
    const [newPostData, setNewPostData] = useState({
        name: '',
        description: ''
    });

    function handleChange({target}){
        const updatedPostData = {...newPostData};
        updatedPostData[target.getAttribute('name')] = target.value;
        setNewPostData(updatedPostData);
    }

    function handleSubmit(e){
        e.preventDefault();

        alert(`New post submitted:
            Name: ${newPostData.name}
            Description: ${newPostData.description}
        `);

        setNewPostData({
            name: '',
            description: ''
        });
    }

    return <>
        <form id='post-an-item-form' onSubmit={handleSubmit}>
            <div className="form-floating">
                <input
                    className="form-control"
                    value={newPostData.name}
                    onChange={handleChange}
                    id="new-post-name"
                    name="name"
                    placeholder="Enter name"
                    required
                />
                <label htmlFor="new-post-name">Enter name</label>
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
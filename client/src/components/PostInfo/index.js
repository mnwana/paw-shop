
// COMPONENT
export default function PostInfo({name, category, username, dateCreated, active}){
    return <div className={`post ${active ? 'active' : 'inactive'} mb-3`}>
        <div className="d-flex justify-content-between">
            <a>{name}</a> <span>in <button>{category}</button></span>
        </div>
        <br />
        Posted by <a>{username}</a> on <span>{dateCreated}  </span>
    </div>;
}
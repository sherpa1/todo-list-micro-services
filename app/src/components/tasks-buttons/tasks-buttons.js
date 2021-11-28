import { Link } from "react-router-dom";

function EditLink(props) {
    return <Link className="button" to={`/tasks/${props.uuid}`}>Edit</Link>;
}

function DeleteButton(props) {


    return <button onClick={() => props.onClick(props.uuid)} className="button button-red">Delete</button>;
}

function ReadLink(props) {
    return <Link className="button" to={`/tasks/${props.uuid}`}>Details</Link>;
}

function BackLink() {
    return <Link className="button" to={`/tasks/`}>Back</Link>;
}

function CreateLink() {
    return <Link className="button button-blue" to={`/tasks/create`}>New Task</Link>;
}

export { ReadLink, DeleteButton, EditLink, BackLink, CreateLink }
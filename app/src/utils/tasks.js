import { Link } from "react-router-dom";

function format_date(created_at) {
    return created_at.toLocaleString('fr-FR');
}

function format_status(status) {
    return (status
        === 1) ? "Done" : "To do";
}

function edit_link(uuid) {
    return <Link className="button" to={`/tasks/${uuid}`}>Edit</Link>;
}

function delete_link(uuid) {
    return <Link className="button button-red" to={`/tasks/${uuid}/delete`}>Delete</Link>;
}

function read_link(uuid) {
    return <Link className="button" to={`/tasks/${uuid}`}>Show</Link>;
}

function back_link() {
    return <Link className="button" to={`/tasks/`}>Back</Link>;
}

function create_link() {
    return <Link className="button" to={`/tasks/create`}>New Task</Link>;
}

export { format_date, format_status, read_link, delete_link, edit_link, back_link, create_link }
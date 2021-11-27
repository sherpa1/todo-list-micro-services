import axios from 'axios';
import React, { useState, useEffect } from 'react';

const api = axios.create({
    baseURL: 'http://localhost:3333/'
});

function format_date(created_at) {
    return created_at.toLocaleString('fr-FR');
}

function format_status(status) {
    return (status
        === 1) ? "Done" : "To do";
}

function edit_link(uuid) {
    return <a class="button" href={`/tasks/${uuid}/edit`}>Edit</a>;
}

function delete_link(uuid) {
    return <a class="button button-red" href={`/tasks/${uuid}/delete`}>Delete</a>;
}

function read_link(uuid) {
    return <a class="button" href={`/tasks/${uuid}`}>Show</a>;
}

function Master() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        const load_tasks = async () => {

            try {
                const result = await api.get('tasks');
                setTasks(result.data.items);

            } catch (error) {

                console.error(error);
            }
        };

        load_tasks();
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <th>Show</th>
                </tr>
            </thead>
            <tbody>

                {tasks.map(item =>
                    <tr>
                        <td>{format_date(item.created_at)}</td>
                        <td>{item.content}</td>
                        <td>{format_status(item.status)}</td>
                        <td>{item.status ? delete_link(item.uuid) : edit_link(item.uuid)}</td>
                        <td>{read_link(item.uuid)}</td>
                    </tr>
                )}

            </tbody>
        </table>
    );
}

export default Master;
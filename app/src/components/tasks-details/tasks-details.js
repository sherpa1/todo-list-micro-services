import React, { useState, useEffect } from 'react';

import api from '../../utils/api_client';

import { useParams } from "react-router-dom";

import { BackLink } from "../tasks-buttons/tasks-buttons";

function TaskDetails(props) {

    const [task, setTask] = useState({});

    const [message, setMessage] = useState('');

    let params = useParams();

    useEffect(() => {

        const load_task = async () => {

            try {
                const result = await api.get(`/tasks/${params.uuid}`);
                setTask(result.data.item);
            } catch (error) {

                console.error(error);
            }
        };

        load_task();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const content = event.target.content.value;
        const status = event.target.status.value;

        const updated_task = task;

        updated_task.status = status;
        updated_task.content = content;

        let result;

        try {
            result = await api.put(`/tasks/${task.uuid}`, updated_task);


            if (result.status === 200) {
                setTask(updated_task);
                setMessage('Task has been successfully updated')
            }

        } catch (error) {
            alert("An error has occurred while updating");
        }

    }

    return (
        <article className="">
            <h1>Task Details</h1>
            <div>
                {
                    (message !== '') ?
                        <p class="flash_message">{message}</p> : null
                }
            </div>
            <form onSubmit={handleSubmit}>
                <p>
                    <label for="content">
                        Content
                    </label>
                    <input type="text" value={task.content} name="content" />
                </p>
                <p>
                    <label for="status">
                        Status
                    </label>
                    <select name="status" disabled={task.status === 1}>
                        <option value="1" selected={task.status === 1}>Done</option>
                        <option value="0" selected={task.status === 0}>To do</option>
                    </select>
                </p>
                {(task.status === 0) ?
                    <button className="button button-green">Update</button>
                    : null
                }
            </form>

            <BackLink />
        </article>
    );
}

export default TaskDetails;
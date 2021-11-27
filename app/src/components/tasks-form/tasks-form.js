import React, { useState } from 'react';

import api from '../../utils/api_client';

import { back_link } from "../../utils/tasks";

function TaskForm(props) {

    const [task, setTask] = useState({});

    const [message, setMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const content = event.target.content.value;
        const status = event.target.status.value;

        const created_task = task;

        created_task.status = status;
        created_task.content = content;

        let result;

        try {
            result = await api.post(`/tasks`, created_task);

            if (result.status === 201) {
                setTask(created_task);
                setMessage('Task has been successfully created')
            }

        } catch (error) {
            alert("An error has occurred");
        }

    }

    return (
        <article className="">
            <h1>New Task</h1>
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
                    <input type="text" name="content" />
                </p>
                <input type="hidden" name="status" value="1" />

                <button className="button button-green">Save</button>
            </form>

            {back_link()}
        </article>
    );
}

export default TaskForm;
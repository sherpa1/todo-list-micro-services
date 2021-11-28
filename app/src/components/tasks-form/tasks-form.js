import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../utils/api_client';

import { BackLink } from "../tasks-buttons/tasks-buttons";

function TaskForm(props) {

    const [task, setTask] = useState({});


    const navigate = useNavigate();

    async function back_to_master() {
        navigate("/tasks?c=1");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const content = event.target.content.value;
        const status = event.target.status.value;

        setTask(task);

        task.status = status;
        task.content = content;

        try {
            const result = await api.post(`/tasks`, task);

            if (result.status === 201) {
                back_to_master();
            }

        } catch (error) {
            alert("An error has occurred");
        }

    }

    return (
        <article className="">
            <h1>New Task</h1>
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

            <BackLink />
        </article>
    );
}

export default TaskForm;
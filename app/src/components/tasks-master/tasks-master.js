import React, { useState, useEffect } from 'react';

import { format_date, format_status, edit_link, delete_link, read_link, create_link } from '../../utils/tasks';

import api from '../../utils/api_client';

function Master(props) {
    const [tasks, setTasks] = useState([]);

    const [message, setMessage] = useState('');

    useEffect(() => {

        const load_tasks = async () => {

            try {
                const result = await api.get('tasks', { params: { direction: props.direction } });
                setTasks(result.data.items);
            } catch (error) {

                console.error(error);
            }
        };

        load_tasks();
    }, [props.direction]);

    return (
        <section>
            <h2>Tasks</h2>
            <div>
                {
                    (message !== '') ?
                        <p class="flash_message">{message}</p> : null
                }
            </div>
            {create_link()}
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
                        <tr key={item.uuid}>
                            <td>{format_date(item.created_at)}</td>
                            <td>{item.content}</td>
                            <td>{format_status(item.status)}</td>
                            <td>{item.status ? delete_link(item.uuid) : edit_link(item.uuid)}</td>
                            <td>{read_link(item.uuid)}</td>
                        </tr>
                    )}

                </tbody>
            </table>


        </section>
    );
}

export default Master;
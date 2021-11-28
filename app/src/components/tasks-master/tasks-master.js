import React, { useState, useEffect } from 'react';


import {
    useSearchParams
} from "react-router-dom";


import { format_date, format_status } from '../../helpers/tasks';
import { CreateLink, ReadLink, DeleteButton, EditLink } from '../tasks-buttons/tasks-buttons';

import api from '../../utils/api_client';

function Master(props) {
    const [tasks, setTasks] = useState([]);
    const [direction, setDirection] = useState('desc');


    const [searchParams] = useSearchParams();//= query strings

    const task_created = searchParams.get('c');//get "c" query string value
    const task_deleted = searchParams.get('d');//get "d" query string value

    const [flash_message, setFlashMessage] = useState('');

    const load_tasks = async () => {

        try {
            const result = await api.get('tasks', { params: { direction: direction } });
            setTasks(result.data.items);
        } catch (error) {

            console.error(error);
        }
    };

    const delete_task = async (uuid) => {

        try {
            const result = await api.delete(`tasks/${uuid}`);

            if (result.status === 200) {
                setFlashMessage(`Task has been deleted`);
                await load_tasks();
            } else {
                alert(`Task has not been deleted`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (task_created) setFlashMessage('The new task has been created');
        if (task_deleted) setFlashMessage('The new task has been deleted');

        load_tasks();
    }, [direction]);

    return (
        <section>
            <h2>Tasks</h2>
            <div>
                {
                    (flash_message !== '') ?
                        <p class="flash_message">{flash_message}</p> : null
                }
            </div>
            <CreateLink />
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
                            <td>{item.status ? <DeleteButton uuid={item.uuid} onClick={delete_task} /> : <EditLink uuid={item.uuid} />}</td>
                            <td><ReadLink uuid={item.uuid} /></td>
                        </tr>
                    )}

                </tbody>
            </table>

            <div>
                <button onClick={() => (direction === 'asc') ? setDirection('desc') : setDirection('asc')}>Order by date of creation ({(direction === 'asc') ? 'desc' : 'asc'})</button>
            </div>

        </section>
    );
}

export default Master;
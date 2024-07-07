import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api/taskapi';

import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { Modal, Button, Card, Stack } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewTaskId, setViewTaskId] = useState(null);
    const [updatedTaskId, setUpdateTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            toast.error('Failed to fetch tasks');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
            toast.success('Task deleted successfully');
        } catch (error) {
            console.error('Failed to delete task:', error);
            toast.error('Failed to delete task');
        }
    };

    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleUpdateModalClose = () => setShowUpdateModal(false);
    const handleViewModalClose = () => setShowViewModal(false);
    const handleCreateModalShow = () => setShowCreateModal(true);

    const handleUpdateModalShow = (id) => {
        setUpdateTaskId(id);
        setShowUpdateModal(true);
    };

    const handleViewModalShow = (id) => {
        setViewTaskId(id);
        setShowViewModal(true);
    };

    return (
        <div className="container mt-4">
            <div className="row mb-3">
                <div className="col ">
                    <h1>Tasks</h1>
                </div>
                <div className="col text-end">
                    <Button variant="primary" onClick={handleCreateModalShow}>
                        Create Task
                    </Button>
                </div>
            </div>
            <div className="row">
                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task && task._id} className="col-lg-3 col-md-4 col-sm-6">
                            <Card style={{ marginBottom: "20px", minHeight: "220px" }}>
                                <Card.Body className="d-flex justify-content-between flex-column ">
                                    <Stack gap={2}>
                                        <Card.Title className="mb-2" style={{ height: "50px" }}>
                                        {task && task.title}
                      
                                        </Card.Title>
                                        <Card.Text>
                                            {task && task.description}
                                        </Card.Text>
                                       
                                    </Stack>
                                    <Stack
                                        direction="horizontal"
                                        className="justify-content-end"
                                        gap={2}
                                    >
                                        <MdEdit
                                            onClick={() => handleUpdateModalShow(task._id)}
                                            className="fs-3"
                                        />
                                        <MdDelete
                                            onClick={() => handleDelete(task._id)}
                                            className="fs-3"
                                        />
                                        <FaEye
                                            onClick={() => handleViewModalShow(task._id)}
                                            className="fs-3"
                                        />
                                    </Stack>
                                </Card.Body>
                                <Card.Footer className="text-muted">{task && task.dueDate.slice(0,10)}</Card.Footer>
                            </Card>
                        </div>
                    ))
                ) : (
                    <h1>YOU DON'T HAVE ANY TASKS</h1>
                )}
            </div>

            <CreateTaskModal
                handleCreateModalClose={handleCreateModalClose}
                showCreateModal={showCreateModal}
                setTasks={setTasks}
            />

            <UpdateTaskModal
                handleUpdateModalClose={handleUpdateModalClose}
                showUpdateModal={showUpdateModal}
                id={updatedTaskId}
                setTasks={setTasks}
            />

            <ViewTaskModal
                handleViewModalClose={handleViewModalClose}
                showViewModal={showViewModal}
                id={viewTaskId}
            />
        </div>
    );
};

export default TaskList;

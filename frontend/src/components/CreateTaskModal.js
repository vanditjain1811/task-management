import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { createTask } from "../api/taskapi";

const CreateTaskModal = ({
  showCreateModal,
  handleCreateModalClose,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreateTask = async () => {
    try {
      const res = await createTask({ title, description, dueDate });
      if (res) {
        console.log(res);
        toast.success("Created succesfully");
        setTasks((prevTasks) => [...prevTasks, res.data]);
        setTitle("");
        setDescription("");
        setDueDate("");
        handleCreateModalClose();
      } else {
        toast.error("Failed to create task");
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "Failed to create task");
    }
  };

  return (
    <div>
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={3}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={3}>
            <label>Due date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;

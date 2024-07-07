import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { getTaskById, updateTask } from "../api/taskapi";

const UpdateTaskModal = ({
  showUpdateModal,
  handleUpdateModalClose,
  id,
  setTasks,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const getSingleTask = async () => {
      try {
       
        const res = await getTaskById(id);
    // console.log(res.data);
        if (res && res.data) {
          console.log(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setDueDate(res.data.dueDate.slice(0,10));
        } else {

          toast.error("Failed to load task details");
        }
      } catch (error) {
        toast.error(error.response ? error.response.data.message : "Failed to fetch task");
      }
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const res = await updateTask(id, { title, description, dueDate });
      toast.success("Updated Successfully");

      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) => {
          if (task._id === id) {
            return { ...task, title, description, dueDate };
          } else {
            return task;
          }
        });
        return updatedTasks;
    });
      handleUpdateModalClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Stack>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTask}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTaskModal;

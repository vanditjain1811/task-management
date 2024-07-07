
import React, { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
import { getTaskById } from "../api/taskapi";

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {


  const [task, setTask] = useState([]);

  useEffect(() => {
    const getSingleTask = async () => {
      await getTaskById(id)
        .then((res) => {
          setTask(res.data);
          console.log(res.data.task);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    if (id) {
      getSingleTask();
    }
  }, [id]);

  return (
    <>
    <Modal show={showViewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <p className="fw-bold mb-0">Title</p>
            <p>{task && task.title}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Description</p>
            <p>{task && task.description}</p>
          </Stack>
          <Stack>
            <p className="fw-bold mb-0">Due Date</p>
            <p>{task && task.dueDate ? task.dueDate.slice(0, 10) : "No due date"}</p>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewTaskModal
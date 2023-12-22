import App from './App';
import React, { useRef, useEffect, useState } from 'react';
import './Todo.css';

function DoneTasks() {
  const taskRef = useRef();
  const updateRef = useRef();
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const email = urlSearchParams.get('email');
    if (email !== null) {
      setEmail(email);
      localStorage.setItem("email", email);
    }

    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://20.62.217.130/crud/todos/${localStorage.getItem("email")}`);
        const data = await response.json();
        const incompleteTasks = data.filter(task => task.status === 'done');
    
        setTasks(incompleteTasks);
      //  setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);



  function openModal(task) {
    setSelectedTask(task);
  }

  function closeModal() {
    setSelectedTask(null);
  }
  function updateTask(e) {
    e.preventDefault();

    const requestOptions = {
      method: 'PATCH',  // Change the method to PATCH
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        $set: {
          task: updateRef.current.value,
         // status: 'incomplete',
          email: localStorage.getItem("email")
        }
      }),
    };

    fetch(`http://20.62.217.130/crud/todos/${selectedTask._id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        return response.json();
      })
      .then(data => {
        // Update the tasks array with the modified task
        setTasks(prevTasks => prevTasks.map(task => (task._id === selectedTask._id ? data : task)));
        console.log('Task updated successfully:', data);
      })
      .catch(error => console.error('Error updating task:', error))
    //  .finally(() => closeModal());  // Close the modal after updating
  }


  function deleteTask(e) {
    e.preventDefault();

    const requestOptions = {
      method: 'DELETE',  // Change the method to PATCH
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      /*body: JSON.stringify({
        $set: {
         // task: updateRef.current.value,
         // status: 'done',
          email: localStorage.getItem("email")
        }
      }),*/
    };

    fetch(`http://20.62.217.130/crud/todos/${selectedTask._id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        return response.json();
      })
      .then(data => {
        // Update the tasks array with the modified task
        setTasks(prevTasks => prevTasks.map(task => (task._id === selectedTask._id ? data : task)));
        console.log('Task deleted successfully:', data);
      })
      .catch(error => console.error('Error deleting task:', error))
    //  .finally(() => closeModal());  // Close the modal after updating
  }

  return (
    <>
      <App />
      <p className="typewriter">Here you will find the list of the done tasks!</p>
      <div className='tasklist'>
      {tasks.map(task => (
        <div key={task._id} className='tasks'>
          <button className="btn btn-primary taskname" onClick={() => openModal(task)} data-bs-toggle="modal" data-bs-target="#challengeModal">
            {task.task}
          </button>
          <br />
          <br />
        </div>
      ))}
</div>
      {/* Modal */}
      <div className="modal fade" id="challengeModal" tabIndex="-1" role="dialog" aria-labelledby="challengeModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title task" id="challengeModalLabel">
                {selectedTask && selectedTask.task}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              {selectedTask && (
                <div>
                  <p>{selectedTask.task}</p>
                  <input type="text" className="form-control" id="updatetask" name="name" placeholder="Update this task" ref={updateRef} />
                  <button onClick={updateTask} type="submit" className="btn mb-3" id="updatebtn">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Update
                  </button>
                 
                  <button type="submit" className="btn btn-danger" onClick={deleteTask}>
                  <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default DoneTasks;

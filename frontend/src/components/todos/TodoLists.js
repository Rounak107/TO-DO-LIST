import axios from 'axios';
import React, { useEffect, useState } from 'react'

function TodoLists({fetchUserTodos , userTodos, setUserTodos, BASE_URL}) {

  
  const [tasks, setTasks] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  console.log (userTodos)

  useEffect(()=>{
    if ( search.length===0 ) {
     fetchUserTodos()
      return
       }

  }, [search]);

      
  
       

      //for Title edit 

      const handleEditTitle = async (user) => {
        // Prompt user to enter a new title
        const newTitle = prompt("Enter New Title");
      
        // Check if the user provided a new title
        if (!newTitle) {
          alert("Please enter a new title to change the current title.");
          return;
        }
      
        try {
          // Send PUT request to the backend to update the title
          const resp = await axios.put(
            `${BASE_URL}/api/editATodo/${user._id}`, // Backend endpoint to update the To-Do item
            {
              Title: newTitle
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true, // Include credentials like cookies if required by the backend
            }
          );
      
          // Handle success and refresh the list of To-Do items
          if (resp.status === 200) {
            alert("Title updated successfully!");
            fetchUserTodos(); // Refresh the list of To-Dos
          }
      
          // Log the response from the server
          console.log("Response from server:", resp);
      
        } catch (error) {
          // Log and handle error cases
          console.error("Error occurred while updating the title:", error);
      
          // Check for server response and display an appropriate error message
          if (error.response) {
            alert(error.response.data.message || "Failed to update title! Please try again.");
          } else {
            alert("Unable to connect to the server!");
          }
        }
      };

        // to delete title

        const handleDeleteTitle = async (user) => {
          // Confirm with the user before proceeding with the deletion
          const confirmDelete = window.confirm("Are you sure you want to delete this To-Do item?");
          
          if (!confirmDelete) {
            return; // Exit the function if the user cancels the deletion
          }
        
          try {
            // Send DELETE request to the backend to delete the To-Do item
            const resp = await axios.delete(
              `${BASE_URL}/api/deleteATodo/${user._id}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true, // Include credentials like cookies if needed by the backend
              }
            );
        
            // Handle success and refresh the To-Do list
            if (resp.status === 200) {
              console.log("To-Do deleted:", resp);
              fetchUserTodos(); // Refresh the list of To-Dos
              window.alert("To-Do item deleted successfully!");
            }
        
          } catch (error) {
            // Handle and log errors
            console.error("Error occurred while deleting the To-Do item:", error);
        
            // Check for server response and provide appropriate feedback
            if (error.response) {
              alert(error.response.data.message || "Failed to delete To-Do item! Please try again.");
            } else {
              alert("Unable to connect to the server!");
            }
          }
        };

            //to create a task inside the specific todo
           
                
            console.log(tasks)
            const handleTasksForTitle = async (title) => {
              // Check if the task input is empty
              if (!tasks) {
                return alert("Please enter a task");
              }
            
              try {
                // Prepare the data for the PUT request
                const data = {
                  Tasks: tasks,
                  DueDate: dueDate,
                };
            
                console.log("Data from handleTasksForTitle:", data);
            
                // Send PUT request to the backend to add the task to the To-Do item
                const resp = await axios.put(
                  `${BASE_URL}/api/insertTaskInTodo/${title}`, // Backend endpoint
                  data,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Include credentials like cookies if required by the backend
                  }
                );
            
                // Log the updated tasks in the console
                console.log("Updated tasks in To-Do:", resp.data.todo.Tasks);
            
                // Clear the input fields after successful task submission
                setTasks("");
                setDueDate("");
            
                // Fetch and refresh the list of To-Dos
                fetchUserTodos();
            
              } catch (error) {
                // Handle and log errors
                console.error("Error occurred while adding task:", error);
            
                // Check for server response and display an appropriate message
                if (error.response) {
                  alert(error.response.data.message || "Failed to add task! Please try again.");
                } else {
                  alert("Unable to connect to the server!");
                }
              }
            };
              
            // //getting all tasks for the title
            //   const [titleTasks, setTitleTasks] = useState(null)

            // const getTasksForTitle  = async (props) =>{

            //   const resp = await axios.get(`/api/TaskInTodo/${props}`)

            //     console.log("checking all tasks",resp)
               
            //   if (resp.data.todo.Tasks.length >0) {
            //     setTitleTasks(resp.data.todo);
            //   }
            // }
            

            //editing a task in todo title
            const handleEditTaskForTitle = async (user, index) => {
              // Prompt the user to enter a new task
              const newTask = prompt("Enter new task");
            
              // Check if the new task is provided
              if (!newTask) {
                alert("Please enter a new task to update the current task.");
                return;
              }
            
              try {
                // Prepare the data for the PUT request
                const data = {
                  taskIndex: index,
                  newTaskText: newTask,
                };
            
                // Send the PUT request to the backend to edit the task
                const resp = await axios.put(
                  `${BASE_URL}/api/editTaskInTodo/${user._id}`, // Backend endpoint to edit a task
                  data,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Include credentials if required by the backend
                  }
                );
            
                // Log the response from the server
                console.log("Response from server:", resp);
            
                // Handle success and refresh the list of To-Dos
                if (resp.status === 200) {
                  alert("Task updated successfully!");
                  fetchUserTodos(); // Refresh the To-Do list to reflect changes
                }
            
              } catch (error) {
                // Handle and log errors
                console.error("Error occurred while updating the task:", error);
            
                // Check for server response and provide appropriate feedback
                if (error.response) {
                  alert(error.response.data.message || "Failed to update the task! Please try again.");
                } else {
                  alert("Unable to connect to the server!");
                }
              }
            };

              //deleting a task for a specific todo title
              const handleDeleteTaskForTitle = async (user, index) => {
                // Ask for confirmation before deleting the task
                const confirmDelete = window.confirm("Are you sure you want to delete this task?");
              
                if (!confirmDelete) {
                  return; // Exit if the user cancels the deletion
                }
              
                try {
                  // Send a PUT request to the backend to delete the specific task
                  const resp = await axios.put(
                    `${BASE_URL}/api/deleteTaskInTodo/${user._id}`, // Backend endpoint to delete a task
                    {
                      taskToBeDeleted: index, // Specify the task index to be deleted
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      withCredentials: true, // Include credentials if required by the backend
                    }
                  );
              
                  // Log the response from the server
                  console.log("Task deleted:", resp);
              
                  // Handle success and refresh the list of To-Dos
                  if (resp.status === 200) {
                    alert("Task deleted successfully!");
                    fetchUserTodos(); // Refresh the To-Do list to reflect changes
                  }
              
                } catch (error) {
                  // Handle and log errors
                  console.error("Error occurred while deleting the task:", error);
              
                  // Check for server response and display an appropriate message
                  if (error.response) {
                    alert(error.response.data.message || "Failed to delete the task! Please try again.");
                  } else {
                    alert("Unable to connect to the server!");
                  }
                }
              };

                //Searching todo or title

      

      
                const submitSearch = async () => {
                  // Check if the search input is empty
                  if (!search) {
                    return alert("Please type something to search.");
                  }
                
                  try {
                    // Send GET request to the backend with search query
                    const resp = await axios.get(
                      `${BASE_URL}/toSearch`, 
                      {
                        params: { search }, // Pass the search query in params
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        withCredentials: true, // Include credentials if required by the backend
                      }
                    );
                
                    console.log("Searching...", resp);
                
                    // Check if no results were found
                    if (resp.data.message === "No such todo or task exist!") {
                      alert("Searched To-Do or task doesn't exist!");
                      setSearch(""); // Clear the search input
                      fetchUserTodos(); // Refresh the To-Do list
                      return;
                    }
                
                    // Update the state with the search results
                    setUserTodos(resp.data.searchedTodos);
                
                  } catch (error) {
                    // Handle and log errors
                    console.error("Error occurred during search:", error);
                
                    // Display appropriate alert in case of error
                    alert(error.response?.data.message || "An error occurred during the search. Please try again.");
                  }
                };

       const handleSearch = async (e) => {
                e.preventDefault()
                submitSearch();
                


       }

      //sort by creation

      const [creationDate, setCreationDate] = useState(null);

      const todoCreationDate = async () => {

       const resp = await axios.get(`${BASE_URL}/sortByDateAndTime`,
  {
             headers: {
               'Content-Type': 'application/json',
             },
             withCredentials: true, // Include credentials if required by the backend
           });
       console.log("sort by creation",resp.data.sortedTodosAtCreation);
         setUserTodos(resp.data.sortedTodosAtCreation);
         setCreationDate(resp.data.sortedTodosAtCreation)
      }

   

      const [updationDate, setUpdationDate] = useState(null);
       //sort by updation
      const todoUpdationDate = async () => {

       const resp = await axios.get(`${BASE_URL}/sortByDateAndTime`
 , {
             headers: {
               'Content-Type': 'application/json',
             },
             withCredentials: true, // Include credentials if required by the backend
           });
       console.log("sort by updation",resp.data.sortedTodosAtUpdation);
         setUserTodos(resp.data.sortedTodosAtUpdation);
         setUpdationDate(resp.data.sortedTodosAtUpdation);
      }

          // Check for due dates and notify the user
  useEffect(() => {
    const checkDueDates = () => {
      const now = new Date();
      userTodos?.forEach(todo => {
        todo?.Tasks?.forEach(task => {
          const taskDueDate = new Date(task?.DueDate);
          const timeDiff = taskDueDate - now;
          const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
          if (daysDiff <= 1) {
            alert(`Task "${task?.Tasks}" is due soon!`);
          }
        });
      });
    };

    checkDueDates();
  }, [userTodos]); 


  return (

    <div>
      <form className='todoForm flex flex-row items-center justify-between border-sold border-2 w-[50rem] h-[5rem] rounded-[1rem] bg-[white] mb-[1rem]  'onSubmit={handleSearch} >
    <div>
  <input type="text" placeholder="Enter to search" className='w-[10rem] m-[1rem] px-[1rem] rounded-[0.5rem] border-sold border-2 placeholder:italic  placeholder:relative placeholder:left-[0.1rem] placeholder:ml-4 h-[3rem] focus:outline-none focus:ring-[0.3rem] focus:ring-violet-700 '
    value={search}
  onChange={(e)=>{setSearch(e.target.value)}}
  ></input>
  <button type='submit' className='text-[#242B2E] bg-[#CAD5E2] px-[3rem] py-[0.5em] rounded-[0.5rem] pointer-cursor font-bold active:bg-violet-700 active:text-white'  >Search</button>
  </div>

  <div className='flex flex-row items-center justify-center space-x-4 mr-[1rem]'>
    <p>
      Sort 
    </p> 
    {/* <select onChange={}  value={}  className=' rounded-[0.5rem]   border-solid border-2 border-bg-gray-300' name="sorting" id="sort">
<option   value="">Select Option</option>
<option value="creation"   > By Creation</option>
<option value="updation">By Updation</option>
</select> */}
    <button type='button' className='text-[#242B2E] bg-[#CAD5E2] px-[1rem] py-[0.5em] rounded-[0.5rem] pointer-cursor font-bold active:bg-violet-700 active:text-white'  onClick={todoCreationDate}  >by creation</button>
    <button type='button' className='text-[#242B2E] bg-[#CAD5E2] px-[1rem] py-[0.5em] rounded-[0.5rem] pointer-cursor font-bold active:bg-violet-700 active:text-white'  onClick={todoUpdationDate}  >by updation</button>
  </div>


  </form>



    <div className='shadow-md bg-slate-100/50  w-[50rem] mx-auto mt-[1rem]'>

      
      {userTodos && userTodos.map((user)=>{
          
       return <div key={user._id} className='overflow-hidden '>
      {/* title bar */}
      
      <label>
        <input className='opacity-0 peer' type="checkbox"/>
        <div className='flex flex-row items-center justify-between  mx-[1rem]'>
        <div  className='flex flex-row items-center justify-between  '>
      <p className='p-[1.2rem] inline-block cursor-pointer' key={user._id} >{user.Title}<p className="p-[1.2rem] text-sm text-gray-500">Due: {new Date(user.DueDate).toLocaleDateString()}</p></p>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" cursor-pointer w-4 h-4 float-right peer-checked:rotate-180 ">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
      </div>

          <div  className='flex flex-row items-center justify-between mx-[1rem] space-x-[2rem]'>
        <button className='bg-gray-300 active:bg-gray-400 px-[0.8rem] rounded-[0.3rem]'
              
          onClick={()=>{handleEditTitle(user)}}
         
        >Edit</button>
        <button className='bg-red-300 active:bg-red-400 px-[0.8rem] rounded-[0.3rem]' 
          onClick={()=>{
            handleDeleteTitle(user)
          }}
        
        >Delete</button>
        </div>
      </div>


          {/* task Section under title */}
      <div className='arrayTasks bg-slate-200/50 max-h-0 peer-checked:max-h-screen '>

                  {/* Adding Tasks inside title */}
          <div className='flex flex-row items-center justify-start ml-[1rem] h-[2.5] space-x-[1.5rem] '>
            <div>
            <input type="text" placeholder='Enter tasks' className='mt-[1.5rem] w-[30rem] h-[2.5rem] rounded-[0.3rem]  px-[1rem] focus:outline-none focus:ring-[0.1rem] focus:ring-gray-500 placeholder:italic  '
            value={tasks}
            onChange={(e)=>{setTasks(e.target.value)}}
            
            />
            </div>
            <div>
            <button   type='button' onClick={()=>handleTasksForTitle(user._id)}   className=' relative bg-gray-300 active:bg-gray-400 px-[0.8rem] rounded-[0.3rem] top-[0.8rem] ' >Add</button>
            </div>
          </div>
            {/* Tasks inside title */}
                   
            {user?.Tasks?.map((task, index) => {
              console.log ({task})
  return (
    <div className='flex flex-row items-center justify-between' key={index}>
      <div>
        <p className="p-[1.2rem] text-md text-gray-500">{task}</p>
        
      </div>
      <div className='flex flex-row items-center justify-between mr-[2rem] space-x-[2rem]'>
        <button className='bg-gray-300 active:bg-gray-400 px-[0.8rem] rounded-[0.3rem]' onClick={() => { handleEditTaskForTitle(user, index) }}>Edit</button>
        <button className='bg-red-300 active:bg-red-400 px-[0.8rem] rounded-[0.3rem]' onClick={() => { handleDeleteTaskForTitle(user, index) }}>Delete</button>
      </div>
    </div>
  );
})}
          
      

        </div>
      </label>
    </div>
    
      })}
      



       
      </div>
    </div>
  )
}

export default TodoLists
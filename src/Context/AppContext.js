import { createContext, useState, useEffect } from "react";
import request from "../utils/request";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
 const [users, setUsers] = useState();
 const [userData, setUserData] = useState()
 const [hasUserData, setHasUserData] = useState(false)
 const [selectOption, setSelectOption] = useState();
 const [taskId, setTaskId] = useState('')
    
 //sort data by completed
  const sortDatabyTaskCompleted = (userData = []) => {
        return [...userData].sort((a, b) => a.completed - b.completed);
    }

    //update user when mark done button clicked
    const updateUserMarked = (userUpdated) => {
      return userData.map((user) =>
        user.id === userUpdated.id ? { ...user, completed: userUpdated.completed } : user
      );
     };

    //get user for select box
  const getUser = async () => {
    try {
      const res = await request.get("users");
      const users = res.data;
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };


  //get tasks of user by id
  const getDataUser = async () => {
    try {
        const res = await request.get(`users/${selectOption}/todos`)
        const userData = res.data
        setUserData(sortDatabyTaskCompleted(userData))
        if(userData.length > 0) setHasUserData(true)
    } catch (error) {
        console.log(error);
    }
  }

  //Update task when click mark done button
  const updateTaskDone = async () => {
    try {
        const res = await request.patch(`todos/${taskId}`, {
            completed: true
        })
        const userUpdated = res.data
        setUserData(sortDatabyTaskCompleted(updateUserMarked(userUpdated)))
        setTaskId('')
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getDataUser();
  }, [selectOption]);

  useEffect(() => {
    updateTaskDone()    
  }, [taskId])

    return <AppContext.Provider value={{users, userData ,selectOption, setSelectOption, hasUserData, taskId ,setTaskId}}>
        {children}
    </AppContext.Provider>
}
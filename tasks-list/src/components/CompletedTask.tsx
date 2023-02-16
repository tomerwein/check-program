import React, { useEffect, useRef, useState } from 'react'
import Task from '../taskInfo'
import {GrEdit, GrReturn} from 'react-icons/gr'
import {AiTwotoneDelete} from 'react-icons/ai'
import './styles.css'

type Props = {
    index: number,
    task: Task,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    importatTasks: Task[],
    setImportantTasks: React.Dispatch<React.SetStateAction<Task[]>>
    generalTasks: Task[],
    setGeneralTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const CompletedTask = ({index, task, tasks, setTasks, generalTasks, setGeneralTasks,
    importatTasks, setImportantTasks} : Props)  => {
    const [isEditClicked, setEditClicked] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>("");

    const backtrackTask = (id:number) => {
        tasks.forEach(() => {
            setImportantTasks(importatTasks.concat(tasks.filter(
                task => task.id === id && task.type === "important"))); 
            setGeneralTasks(generalTasks.concat(tasks.filter(
                task => task.id === id && task.type === "general")));
          });
          
          setTasks(tasks.filter((task) => task.id !== id));
    }
    
    const deleteTask = (id:number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const approveEdit = (e: React.FormEvent ,id:number) => {
        e.preventDefault();
        setTasks(tasks.map((task) => (task.id === id?
         {...task, task:editText} : task)))     
        //  {setEditClicked(false)}

    }
    
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      inputRef.current?.focus();
    }, [isEditClicked])
    

    return (
    <form className='single_task'
    onSubmit={(e) => approveEdit(e, task.id)}>
        
        {
            isEditClicked?
            (<input 
                ref={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="single_task_text"
                /> 
                
                ) :
                <span className='single_task_box'>{task.task}</span>
        }
        
    <div>
        <span className='icon' onClick={() => {
            if (isEditClicked){
                setEditClicked(!isEditClicked);
                
                console.log(isEditClicked);
        
            }
            else{
                setEditClicked(!isEditClicked);
                console.log(isEditClicked);
            }
        }
            }>
            <GrEdit/>
        </span>
        <span className='icon' onClick={() => deleteTask(task.id)}>
            <AiTwotoneDelete/>
        </span>
        <span className='icon' onClick={() => backtrackTask(task.id)}>
            <GrReturn/>
        </span>

    </div>

    </form>
    
  )
}
export default CompletedTask
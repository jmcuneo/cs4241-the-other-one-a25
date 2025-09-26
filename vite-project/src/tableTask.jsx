
import { useEffect, useState } from "react";


function TableTask( { id, task, priority, created, deadline, onDelete } ){

    return (
        <tr>
            <td>{ id }</td>
            <td>{ task } </td>
            <td className={`${priority}`}>{ priority }</td>
            <td>{ created }</td>
            <td>{ deadline} </td>
            <td>
                <button onClick= { onDelete() }>Delete</button>
            </td>
        </tr>
        
    )
}

function Table(){
    const [ taskItems, setTaskItems ] = useState([
        {
            id: 1,
            task: "foo",
            priority: "done",
            created: "02-03-2020",
            deadline: "04-24-2020",
        }
    ]);

    useEffect(() => {
        console.log("Effect used");
    });


    return(
        <>
            <table>
                <thead>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                </thead>
                <tbody>
                { taskItems.map( (task, i) => <TableTask key={i} id={task.id} task={task.task} priority={task.priority} created={task.created} deadline={task.deadline} onDelete={ () => console.log("foo") } />)}
                </tbody>
            </table>
        </>
        
    )
}

export default Table;
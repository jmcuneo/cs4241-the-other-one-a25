import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Form from "./Form.jsx";


function Order(){

    window.onload = ()=>{
        getTable().then()
    }

    const getTable = async () => {
        const table = document.getElementById("results")
        //sends a get request for the data stored in the server
        const response = await fetch("/read",
            {
                method: "GET",
            })
        //extracts the data
        const data = await response.json()
        if(data instanceof Array) {
            // console.log(data)
            if(table){
                for(let i=0;i<data.length;i++){
                    //creates a new row
                    const row = table.insertRow()
                    //creates cells in row for all values returned from the server
                    row.insertCell().innerHTML = data[i].firstName
                    row.insertCell().innerHTML = data[i].lastName
                    row.insertCell().innerHTML = data[i].address
                    row.insertCell().innerHTML = data[i].shirts
                    row.insertCell().innerHTML = data[i].jackets
                    row.insertCell().innerHTML = data[i].hats
                    row.insertCell().innerHTML = data[i].totalPrice

                    const buttonHolder = document.createElement("div");
                    buttonHolder.className = "buttonHolder";


                    //gives the delete button its functionality which is to have the server delete the row, and then reload the page
                    const del = document.createElement("button");
                    del.innerText = "delete"
                    del.className = "delete"
                    del.onclick = async () => {
                        //creates body for http request
                        const body = JSON.stringify( {
                            "row":i,
                        })
                        //Uses DELETE request to update table
                        await fetch("/delete", {
                            method: "DELETE",
                            body: body,
                            headers:{"Accept":"application/json","Content-Type":"application/json"},
                        }).then(()=>{
                            // console.log(response)
                            window.location.reload()
                        })
                    }

                    buttonHolder.appendChild(del)

                    row.insertCell().appendChild(buttonHolder)
                }
            }
        }
    }

    return(<>
        <div className="main" id="first">
            <table className="collapsible">
                <caption><strong>Current Orders in the System</strong></caption>
                <tbody id="results" className="collapsible">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Number of Shirts</th>
                        <th>Number of Jackets</th>
                        <th>Number of Hats</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)

}

export default Order;
import { useState } from 'react'
import './main.css'
import {Outlet} from "react-router-dom";

const Form = (props) =>  {

    const submit = async function( event ) {
        // stop form submission from trying to load
        // a new .html page for displaying results...
        // this was the original browser behavior and still
        // remains to this day
        event.preventDefault()
        if(hats !== "" && jackets !== "" && shirts !== ""){
            //retrieves the elements of the form
            const json = {firstName: firstName, lastName: lastName, address: address, shirts:parseInt(shirts), jackets:parseInt(jackets), hats:parseInt(hats)};
            const body = JSON.stringify(json);
            //sends a post request to the server
            const response = await fetch( "/add", {
                method:"POST",
                headers:{"Accept":"application/json","Content-Type":"application/json"},
                body
            })

            const text = await response.text()
            const msg = document.getElementById( "response message" ) //gets the response message
            if(response){
                if(response.status === 200) {
                    msg.innerHTML = "Received order with information:" + text
                    setTimeout(()=>{
                        msg.innerHTML = ""
                    },1000)
                }
                else{
                    msg.innerHTML = "Something went wrong with order submission"
                }
            }
            console.log( "text:", text )

        }




    }


    // <nav>
    //     <h1>Gompei's Gear</h1>
    //     <div>
    //         <p>Home</p>
    //         <p><a href="">Orders</a></p>
    //     </div>
    // </nav>



    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hats, setHats] = useState("0");
    const [jackets, setJackets] = useState("0");
    const [shirts, setShirts] = useState("0");
    return (<div className="main">
                <form id={props.id}>
                    <h2>Merch Form</h2>
                    <div className="vertical">
                        <div className="horizontal">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" placeholder="Please Enter First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                        </div>
                        <div className="horizontal">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" placeholder="Please Enter Last Name" value={lastName} onChange={e=>{setLastName(e.target.value)}}/>
                        </div>
                        <div className="horizontal">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" placeholder="Please Enter Address" value={address} onChange={e=>{setAddress(e.target.value)}}/>
                        </div>
                        <div className="horizontal">
                            <label htmlFor="shirts">Number of Shirts:</label>
                            <input type="number" id="shirts" placeholder="0" value={shirts} min="0" max="1000" step="1" onChange={e=>{setShirts(e.target.value)}}/>
                        </div>
                        <div className="horizontal">
                            <label htmlFor="jackets">Number of Jackets:</label>
                            <input type="number" id="jackets" placeholder="0" value={jackets} min="0" max="1000" step="1" onChange={e=>{setJackets(e.target.value)}}/>
                        </div>
                        <div className="horizontal">
                            <label htmlFor="hats">Number of Hats:</label>
                            <input type="number" id="hats" placeholder="0" value={hats} min="0" max="1000" step="1" onChange={e=>{setHats(e.target.value)}}/>
                        </div>
                    </div>
                    <button onClick={submit}>submit</button>
                </form>
                <p id="response message"></p>
    </div>)
}

export default Form

// FRONT-END (CLIENT) JAVASCRIPT HERE


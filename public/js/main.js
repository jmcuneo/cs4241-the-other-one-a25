// FRONT-END (CLIENT) JAVASCRIPT HERE


const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()

  // const input = document.querySelector( "#yourname" ),
  //       json = { yourname: input.value },
  //       body = JSON.stringify( json )
  const item = document.querySelector("#item").value.trim()
  const category = document.querySelector("#category").value.trim()
  const expirationDate = document.querySelector("#expirationDate").value

  const json = { item, category, expirationDate }
  const body = JSON.stringify(json)

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  // const text = await response.text()

  // console.log( "text:", text )

  const data = await response.json()
  updateTable(data)
}

const updateTable = function(data) {
  const tableBody = document.querySelector("#groceryListTable tbody")
  tableBody.innerHTML = "" // clear current rows

  data.forEach((entry, index) => {
    const row = document.createElement("tr")

    row.innerHTML = `
    <td>${entry.item}</td>
    <td>${entry.category}</td>
    <td>${entry.expirationDate}</td>
    <td>${entry.daysUntilExpiration} day(s) </td>
    <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    <td><button class="edit-btn" data-index="${index}">Edit</button></td>
    `

    tableBody.appendChild(row)

  })

  // need to add event listeners for delete button
  const deleteButtons = document.querySelectorAll(".delete-btn")
  deleteButtons.forEach(button => {
    button.onclick = async function() {
      const index = this.getAttribute("data-index")
      // call delete with index
      await deleteItem(index)
    }
  })
}


const deleteItem = async function(index) {
  const response = await fetch("/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ index: Number(index) })
  })

  if (response.ok) {
    const updatedData = await response.json()
    updateTable(updatedData)
  } else {
    console.error("ERROR: delete failed")
  }
}
window.onload = function() {
   const form = document.querySelector("#groceryForm");
  form.onsubmit = submit;
}
// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  event.preventDefault()
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day


  
  if (stormname.value == "" || year.value == ""){
    alert("You forgot to put in the name and year")
  }

  else{

    let oldTable = document.getElementById("dataset");
    let parentElement = oldTable.parentNode;
    parentElement.removeChild(oldTable);
    
    const stormname = document.querySelector( "#stormname" ),
          year = (document.querySelector( "#year" )),
          windspeed = (document.querySelector( "#windspeed" )),
          airpressure = (document.querySelector( "#airpressure" ))
    
    const dataset = document.createElement('table');

    const data = {
      Name: stormname.value,
      Year: year.value,
      Windspeed: windspeed.value,
      Airpressure: airpressure.value
    };
    
    const body = JSON.stringify(data)
    
    

    const response = await fetch( "/submit", {
      method:"POST",
      body 
    }).then(function(response) {return response.json();})
    .then(function(json) {
      
    

      const categories = document.createElement('thead');
      const hurricanes = document.createElement('tbody');

      const catRow = document.createElement('tr');
      Object.keys(json[0]).forEach(key => {
        const cat = document.createElement('th');
        cat.textContent = key;
        if (cat.textContent === "Windspeed"){
          cat.textContent = "Wind Speed (mph, 1-minute sustained)"
        }
        if (cat.textContent === "Airpressure"){
          cat.textContent = "Air Pressure (mbar)"
        }
        catRow.appendChild(cat);
      });
      categories.appendChild(catRow);

      json.forEach( item => {
        let wind = 0;
        const hurricane = document.createElement('tr');
        Object.values(item).forEach(value => {
          wind++;
          const property = document.createElement('td');
          property.textContent = value;
          hurricane.appendChild(property);
          if (wind == 3){
            if (value >= 157){
              hurricane.style.backgroundColor = 'pink';
            }
            else if (value >= 130){
              hurricane.style.backgroundColor = 'red';
            }
            else if (value >= 111){
              hurricane.style.backgroundColor = 'orange';
            }
            else if (value >= 96){
              hurricane.style.backgroundColor = 'yellow';
            }
            else if (value >= 74){
              hurricane.style.backgroundColor = 'white';
            }
            else if (value >= 39){
              hurricane.style.backgroundColor = 'cyan';
            }
            else{
              hurricane.style.backgroundColor = 'blue';
            }
          }
        })
        hurricanes.appendChild(hurricane);

      })

      dataset.appendChild(categories);
      dataset.appendChild(hurricanes);

      dataset.id = "dataset";

      document.body.appendChild(dataset);

    })
  }

}

const deletion = async function( event ) {
  event.preventDefault()
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day


  
  if (stormname.value == "" || year.value == ""){
    alert("You forgot to put in the name and year")
  }

  else{

    let oldTable = document.getElementById("dataset");
    let parentElement = oldTable.parentNode;
    parentElement.removeChild(oldTable);
    
    const stormname = document.querySelector( "#stormname" ),
          year = (document.querySelector( "#year" ))
    
    const dataset = document.createElement('table');

    const data = {
      Name: stormname.value,
      Year: year.value,
    };
    
    const body = JSON.stringify(data)
    
    

    const response = await fetch( "/delete", {
      method:"POST",
      body 
    }).then(function(response) {return response.json();})
    .then(function(json) {
      
      

      const categories = document.createElement('thead');
      const hurricanes = document.createElement('tbody');

      const catRow = document.createElement('tr');
      Object.keys(json[0]).forEach(key => {
        const cat = document.createElement('th');
        cat.textContent = key;
        if (cat.textContent === "Windspeed"){
          cat.textContent = "Wind Speed (mph, 1-minute sustained)"
        }
        if (cat.textContent === "Airpressure"){
          cat.textContent = "Air Pressure (mbar)"
        }
        catRow.appendChild(cat);
      });
      categories.appendChild(catRow);

      json.forEach( item => {
        let wind = 0;
        const hurricane = document.createElement('tr');
        Object.values(item).forEach(value => {
          wind++;
          const property = document.createElement('td');
          property.textContent = value;
          hurricane.appendChild(property);
          if (wind == 3){
            if (value >= 157){
              hurricane.style.backgroundColor = 'pink';
            }
            else if (value >= 130){
              hurricane.style.backgroundColor = 'red';
            }
            else if (value >= 111){
              hurricane.style.backgroundColor = 'orange';
            }
            else if (value >= 96){
              hurricane.style.backgroundColor = 'yellow';
            }
            else if (value >= 74){
              hurricane.style.backgroundColor = 'white';
            }
            else if (value >= 39){
              hurricane.style.backgroundColor = 'cyan';
            }
            else{
              hurricane.style.backgroundColor = 'blue';
            }
          }
        })
        hurricanes.appendChild(hurricane);

      })

      dataset.appendChild(categories);
      dataset.appendChild(hurricanes);

      dataset.id = "dataset";

      document.body.appendChild(dataset);

    })
  }

}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
   const removal = document.querySelector("#delete");
  removal.onclick = deletion;
   
}
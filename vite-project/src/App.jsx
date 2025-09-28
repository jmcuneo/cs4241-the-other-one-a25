
import './App.css'

function App() {


  return (
    <>

        <h1>To-do List Application</h1>
        <div className="grid-container"> 
          <div className="grid-item">
              <section className="form-section">
              <h2>Add New To-do</h2>
              <form id="todo-form">
                <div className="form-group">
                  <label htmlFor="task">Task:</label>
                  <input type="text" id="task" name="task" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="priority">Priority:</label>
                  <select id="priority" name="priority" required>
                    <option value="">Select priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="creation_date">Creation Date:</label>
                  <input type="date" id="creation_date" name="creation_date" required />
                </div>
                
                <button type="submit">Add To-do</button>
              </form>
            </section>
          </div>
          <div className="grid-item">
              <section className="results-section">
              <h2>Current To-dos</h2>
              <div id="results-display" className="todo-table">
                <table id="todo-table">
                  <thead>
                    <tr>
                      <th style={{backgroundColor: "#8e7572"}}>ID</th>
                      <th style={{backgroundColor: "#8e7572"}}>Task</th>
                      <th style={{backgroundColor: "#8e7572"}}>Priority</th>
                      <th style={{backgroundColor: "#8e7572"}}>Creation Date</th>
                      <th style={{backgroundColor: "#8e7572"}}>Deadline</th>
                      <th style={{backgroundColor: "#8e7572"}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody id="todo-list">
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
    </>
  )
}

export default App

import {useState, useEffect} from 'react';
import TaskRow from './components/TaskRow'
import TaskBanner from './components/TaskBanner';
import TaskCreator from './components/TaskCreator'
import VisiblityChange from './components/VisiblityChange';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [userName, setUserName] = useState('');   
  const [taskItems, setTaskItems] = useState([])
  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if(data != null){
      setTaskItems(JSON.parse(data))
    } else {
      setUserName('Admin')
      setTaskItems([
        {name: 'Task 11', done: false},
        {name: 'Task 21', done: true},
        {name: 'Task 31', done: true},
        {name: 'Task 41', done: false}
      ])
      setShowCompleted(true)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems])

  const createNewTask = (taskName) => {
    if(!taskItems.find( task => task.name === taskName)){
      setTaskItems([...taskItems,{name: taskName, done: false}])
    }
  }

  const toggleTask = (task) => {
    setTaskItems( taskItems.map ( t => ( t.name === task.name ? {...t, done: !t.done} : t)))
  }

  const taskPrinter = (doneValue) => (
    taskItems
    .filter( task => task.done === doneValue )
    .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask}/>
    ))
  )

  return (
    <div className="App">
      <TaskBanner userName={userName} taskItems={taskItems}/>      
      <div className="p-4">
        <TaskCreator createNewTask={createNewTask}/>
        <table className="table table-striped table-bordered table-hover mt-4">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            { taskPrinter(false) }
          </tbody>
        </table>
        <div className="bg-secondary-text-white d-flex justify-content-center p-2">
          <VisiblityChange isChecked={showCompleted} callback={checked => setShowCompleted(checked)}/>
        </div>

        {
          showCompleted && (
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>
                {taskPrinter(true)}
              </tbody>
            </table>
          )
        }
      </div>    
    </div>
  );
}

export default App;

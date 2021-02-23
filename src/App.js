import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home/index'
import TodoList from './pages/todoList/index'
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path="/todoList" component={TodoList}/>
    </Router>
  );
}

export default App;

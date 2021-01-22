import './App.css';
import './bootstrap.css';
import React from 'react';
import TodoApp from './components/todo/TodoApp';

class App extends React.Component {

  render() {
    return (
      <div className="App">

        { /* <Counter/> */}
        <TodoApp/>
      </div>
    );
  }
 
}



export default App;

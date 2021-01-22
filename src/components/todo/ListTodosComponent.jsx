import React from 'react';
import AuthenticationService from './AuthenticationService.js';
import TodoDataService from './TodoDataService.js';
import moment from 'moment';

class ListTodosComponent extends React.Component {


    constructor(props) {
        console.log('listTodoComponent :: constructor ');
        super(props)
        this.state = {
            message : null,
            todos: [
               // { id: 1, description: "Learn react", done: false, targetDate: new Date() },
               // { id: 2, description: "Learn DS", done: false, targetDate: new Date() },
               // { id: 3, description: "Get great Job", done: false, targetDate: new Date() }
            ]
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.createTodoClicked = this.createTodoClicked.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
    }

    componentDidMount(){
        console.log('listTodoComponent :: componentDidMount() ');
        this.refreshTodos();
    }

    refreshTodos(){
        let user = AuthenticationService.getLoggedInUser();
        console.log('user ::  '+user);
      
        TodoDataService.retrieveAllTodos(user)
            .then(
                response => {
                    this.setState({ todos: response.data })
                }
            )
    }

    componentWillUnmount(){
        console.log('component willUnmount')
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate');
        console.log(nextProps)
        console.log(nextState)
        return true;

    }

    deleteTodoClicked(id){
        let user = AuthenticationService.getLoggedInUser();

        console.log('user in delete operation : '+user);
        
        TodoDataService.deleteTodo(user, id)
            .then(
                response => {
                   this.setState({ message: `Delete of todo ${id} Successful` })
                   this.refreshTodos()
                }
            )
    }

    updateTodoClicked(id){
        let user = AuthenticationService.getLoggedInUser();
        console.log('update Todo : '+id);
        this.props.history.push(`/todos/${id}`)  
    }

    createTodoClicked(){
        this.props.history.push(`/todos/-1`)
    }

    render() {
        console.log('listTodoComponent : render()');
        return (
            <div className="ListTodosComponent">
                <h1>List todos</h1>
                { this.state.message != null && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed</th>                                
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td> {todo.description}</td>
                                            <td> {moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td> {todo.isDone.toString()}</td>
                                            <td><button className="btn btn-warning" name="delete" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                            <td><button className="btn btn-success" name="update" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        </tr>
                                )}
                        </tbody>


                    </table>
                </div>
                <div className="container">
                    <button className="btn btn-success" onClick={this.createTodoClicked}>Add</button>
                </div>
            </div>
        );
    }
}

export default ListTodosComponent;
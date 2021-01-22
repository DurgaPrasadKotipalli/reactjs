import React, { Component } from 'react'
import Login from './LoginComponent'
import Welcome from './welcomeComponent'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ListTodosComponent from './ListTodosComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import LogoutComponent from './logoutComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import TodoComponent from './TodoComponent';

class TodoApp extends Component {

    render() {
        return (
            <div className="TodoApp">
                <BrowserRouter>
                    <>
                        <HeaderComponent />

                        <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/login" component={Login} />
                            <AuthenticatedRoute path="/welcome/:name" component={Welcome} />                            
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                            <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>

                        <FooterComponent />
                    </>
                </BrowserRouter>
            </div>
        );
    }

}

function ErrorComponent() {
    return <div>Error occured, i don't know what to do, contact support at +91-9652126899</div>
}

export default TodoApp;
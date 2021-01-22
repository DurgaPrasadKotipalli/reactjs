import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import HelloworldService from './HelloworldService';

class welcomeComponent extends Component{

    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.state = {
            welcomeMessage : ''
        }
    }

   render(){
        return (
            <>
            <div>
                <h1> Welcome! </h1>
               Welcome to {this.props.match.params.name}.
               You can manage todos <Link to="/todos">here </Link>
            </div>

            <div className="container">
               Click here to get customized welcome message
               <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">GetWelcome Message</button>
            </div>

            <div className="container">
              {this.state.welcomeMessage}
            </div>
            </>
        );
    }

    retrieveWelcomeMessage(){
        console.log('Retrieve clicked');
        HelloworldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then( response => this.handleSuccessfulResponse(response) )
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error){
        let errorMessage = '';
        if(error.message){
            errorMessage += error.message;
        }
       if(error.response && error.response.data){
           errorMessage += error.response.data.message
       }
        this.setState({welcomeMessage: errorMessage})
    }
}

export default welcomeComponent;
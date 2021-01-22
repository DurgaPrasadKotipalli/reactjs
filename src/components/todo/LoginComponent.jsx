import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService';

class LoginComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            uname : 'durga',
            password : '',
            hasLoginFailed : false,
            showSuccessMessage : false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event){
        console.log(event.target.value);
        this.setState({ [event.target.name] : event.target.value})
    }

    // handlePasswordChange(event){
    //     console.log(event.target.value);
    //     this.setState({password : event.target.value})
    // }

    loginClicked(){
        /*
        if(this.state.uname === 'durga' && this.state.password === 'dp'){
            AuthenticationService.registerSuccessfulLogin(this.state.uname, this.state.password);
            //this.setState({hasLoginFailed : false})
            //this.setState({showSuccessMessage : true})
            this.props.history.push(`/welcome/${this.state.uname}`)            
        }else{
            this.setState({hasLoginFailed : true})
            this.setState({showSuccessMessage : false})
            console.log('login unsuccessful')
        }

        */
        
        /*
        AuthenticationService
        .executeBasicAuthenticationService(this.state.uname, this.state.password)
        .then( () => {
           AuthenticationService.registerSuccessfulLogin(this.state.uname, this.state.password);
             this.props.history.push(`/welcome/${this.state.uname}`) 

            })
        .catch( () => {
            this.setState({hasLoginFailed : true})
            this.setState({showSuccessMessage : false})
        })

       */
        AuthenticationService
        .executeJwtAuthenticationService(this.state.uname, this.state.password)
        .then( (response) => {
            console.log('JWT authentication service is successful')
           AuthenticationService.registerSuccessfulLoginForJwt(this.state.uname, response.data.token);
             this.props.history.push(`/welcome/${this.state.uname}`) 

            })
        .catch( () => {
            this.setState({hasLoginFailed : true})
            this.setState({showSuccessMessage : false})
        })
    }

    render(){
        return (
            <div>
                <h1>Login</h1>
                
                {/*<ShowInvalidCredentials hasLoginFailed ={this.state.hasLoginFailed}/>
                <ShowLoginSuccess showSuccessMessage = {this.state.showSuccessMessage}/> */}
                {this.state.hasLoginFailed && <div className="alert alert-warning"> Inavalid Credentials </div> }
                {this.state.showSuccessMessage && <div> Login Successful</div> }
                User Name : <input type="text" name="uname" value={this.state.uname} onChange={this.handleChange}/>
                Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            </div>
        );
    }

}


// function ShowInvalidCredentials(props){
//     console.log('show invalid credentials')
//     if(props.hasLoginFailed){
//         return <div> Inavalid Credentials</div>
//     }else{
//         return null
//     }
// }

// function ShowLoginSuccess(props){
//     console.log('login Success')
//     if(props.showSuccessMessage){
//         return <div> Login Successful</div>
//     }else{
//         return null
//     }
// }
export default LoginComponent;
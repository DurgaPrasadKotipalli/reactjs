import axios from "axios";
import { API_URL, JPA_API_URL }from '../../constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(username, password){
         return axios.get(`${API_URL}/basicAuth`,
          {
              headers : {authorization : this.createBasicAuthToken(username, password)}
          }

         )
    }

    executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`,
         {
            username,
            password
         }

        )
   }

    createBasicAuthToken(username, password){
        return 'Basic '+ window.btoa(username + ":" + password);
    }

    createJwtToken(token){
        return 'Bearer ' + token
    }
    registerSuccessfulLogin(username, password) {
        console.log('registerSuccessfulLogin')
        //let basicAuthHeader = 'Basic '+ window.btoa(username + ":" + password)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }


    registerSuccessfulLoginForJwt(username, token) {
        console.log('LoginComponent registerSuccessfulLogin JWT')
        //let basicAuthHeader = 'Basic '+ window.btoa(username + ":" + password)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user === null){
            return false;
        } else{
            return true;
        }
        
    }


    getLoggedInUser(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user === null){
            return '';
        } else{
            return user;
        }
    }


    setupAxiosInterceptors(basicAuthHeader){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = basicAuthHeader
                }
                return config                
            }
        )
    }
}


export default new AuthenticationService()
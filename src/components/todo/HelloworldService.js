import axios from "axios"

class HelloworldService{
    executeHelloWorldService(){
        console.log('executed service')
        return axios.get('http://localhost:8080/hello');
    }

    executeHelloWorldBeanService(){
        console.log('executed bean service')
        return axios.get('http://localhost:8080/hello-bean');
    }

    executeHelloWorldPathVariableService(name){
        console.log('executed bean service')
        //let username = 'durga'
        //let password = 'dp'
        //let basicAuthHeader = 'Basic '+ window.btoa(username + ":" + password)
        return axios.get(`http://localhost:8080/hello-path-variable/${name}`
           
        );
    }
}

export default new HelloworldService()
import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import AuthenticationService from './AuthenticationService';

class HeaderComponent extends React.Component {
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log('is user logged in :');
        console.log(isUserLoggedIn);
        return (
            
                <header>
                    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                        <div><a href="http://www.in28minutes.com" className="navbar-brand">Durga Prasad</a></div>
                        <ol className="navbar-nav">
                            {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/durga">Home</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                        </ol>
                        <ol className="navbar-nav navbar-collapse justify-content-end">
                            {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                            {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                        </ol>
                    </nav>
                </header>
        );
    }
}

export default withRouter(HeaderComponent);
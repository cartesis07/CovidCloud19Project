import React, {useContext} from 'react';

import { signInWithGoogle } from "../services/firebase";
import { auth } from '../services/firebase';

import 'bootstrap/dist/css/bootstrap.css';
import { Button,  UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, } from 'reactstrap';

import './login.css';

import UserContext from '../userContext'
import { Update } from '@material-ui/icons';

export class LogIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: null,
            visibility: false
        };
    }

    static contextType = UserContext

    unsubscribeFromAuth = null;

    updateuser(newuser){
        const {user, updateUser} = this.context
        updateUser(newuser)
    }

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(googleuser => {
            this.setState({ currentUser: googleuser });
            this.setState({
                visibility: true
            });
            this.updateuser(googleuser)
        });
    }
    
    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    signOutMethod(){
        auth.signOut()
        this.updateuser(null)
    }

    render() {
        return(
            <div className="row">
                {!this.state.currentUser && this.state.visibility ? <Button outline size="sm" color="primary" onClick={signInWithGoogle}>
                    <img src="https://img.icons8.com/plasticine/2x/google-logo.png" alt="google icon" width="40" height="40"/>
                        &nbsp; <b>Sign In with Google</b>
                </Button> : null}
                {this.state.currentUser ? <UncontrolledDropdown>
              <DropdownToggle nav>
              <img className="profile" alt="Avatar" width="45px" height="45px" src={this.state.currentUser.photoURL}/>
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem className="dropdownitem">
              <Button text-align="center" size="sm" outline color="secondary">{this.state.currentUser.displayName}</Button>
                </DropdownItem>
                <DropdownItem className="dropdownitem">
                <Button text-align="center" size="sm" outline color="danger" onClick={() => this.signOutMethod()}>Log Out</Button>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> : null}
            </div>
        );
    }
}
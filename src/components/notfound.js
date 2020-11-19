import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Button} from 'reactstrap';

export class NotFound extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){

    }
    
    render(){
        return(
            <div>
            <h1>404 - Not Found !</h1>
            <h6>The page you are looking for does not exist.<br/>
          How you got here is a mystery. <br/> But you can click the button below
          to go back to the homepage.</h6>
            <Button href="/" color="primary">Home</Button>
          </div>
        );
    }
}
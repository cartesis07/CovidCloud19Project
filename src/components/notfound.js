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
            <section class="jumbotron text-center" className="jumbotron">
        <div class="container">
          <h1 class="jumbotron-heading">Oops... not found ! </h1>
          <p class="lead">The page you are looking for does not exist.<br/>
          How you got here is a mystery. <br/>
          But you can click the button below to go back to the homepage.
          </p>
          <p>
            <a href="/" class="btn btn-primary my-2">Home</a>
          </p>
        </div>
      </section>
          </div>
        );
    }
}
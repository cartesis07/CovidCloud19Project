import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Alert } from 'reactstrap';
import { Button } from 'reactstrap';
import "./alertinfo.css"

export class AlertInfo extends React.Component{
    render(){
        return(
            <div className="alert">
            <Alert color="primary">
                The data displayed on this web application is retrieved from : COVID19API, sourced from Johns Hopkins CSSE. 
            </Alert>
            <Button color="link" href="https://covid19api.com" target="_blank">Visit COVID19API</Button>
            </div>


        );
    }
}
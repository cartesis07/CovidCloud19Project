import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Alert } from 'reactstrap';
import "./alertinfo.css"

export class AlertInfo extends React.Component{
    render(){
        return(
            <div className="alert">
            <Alert color="primary">
                The data displayed on this web application is retrieved from : <a href="https://covid19api.com" target="_blank">COVID19API</a>, sourced from Johns Hopkins CSSE. 
            </Alert>
            </div>
        );
    }
}
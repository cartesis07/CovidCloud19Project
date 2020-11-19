import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Alert, Button } from 'reactstrap';
import "./alertinfo.css"

export class AlertInfo extends React.Component{

    scrollTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
     };

    render(){
        return(
            <div className="alert">
            <Button outline className="Scrollbutton" color="primary" onClick={() =>this.scrollTop()}>
                Back To Top
            </Button>
            <Alert color="primary">
                The data displayed on this web application is retrieved from : <a href="https://covid19api.com" target="_blank">COVID19API</a>, sourced from Johns Hopkins CSSE. 
            </Alert>
            </div>
        );
    }
}
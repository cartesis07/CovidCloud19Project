import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

import "./table.css"

export class AddNews extends React.Component {
    constructor(){
        super();
        this.state={
            submit: false,
        }
    }
    componentDidMount(){

    }

    submit(){
        this.setState({submit: true})
    }

    render(){
        return(
            <div className="news">
        {this.state.submit ? <Alert color="success">
        <h4 className="alert-heading">Well done !</h4>
        <p>
            Your news has been added to our firebase database.
        </p>
        <hr />
        <p className="mb-0">
          You can now view it on the homepage or on the specified country page !
        </p>
      </Alert>: null}
      {!this.state.submit ?<Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Text Area</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <Button onClick={() => this.submit()}>Submit</Button>
    </Form> : null}
            </div>
        );
    }
}

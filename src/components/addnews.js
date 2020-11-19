import React from 'react';
import { Button, Form, FormGroup, Label, Input, Badge, Alert } from 'reactstrap';

import "./table.css"

import UserContext from '../userContext'

export class AddNews extends React.Component {
    constructor(){
        super();
        this.state={
            submit: false,
        }
    }

    static contextType = UserContext

    componentDidMount(){
    }

    submit(){
        this.setState({submit: true})
    }

    render(){
        const { user, updateUser } = this.context
        console.log(user)
        return(
            <div className="news">
        {user == null ? <Alert color="info">
        <h4 className="alert-heading">Sign In with Google</h4>
        <p>
            Please, sign in with Google to add news in the database.
        </p>
        <hr />
        <p className="mb-0">
          Only eligible users are allowed to add news.
        </p>
      </Alert>: null}
        {this.state.submit ? <Alert color="success">
        <h4 className="alert-heading">Well done !</h4>
        <p>
          Thanks for your contribution, these news have been added to our database.
        </p>
        <hr />
        <p className="mb-0">
          You can now view it on the homepage or on the specified country page !
        </p>
      </Alert>: null}
      {!this.state.submit && user !== null ?
       <div>
       <h3>Add news to the website</h3>
       <br/>
      <Form>
      <FormGroup>
        <Label for="Name">Username</Label>
        <Input valid="true" readonly="readonly" type="username" name="username" id="username" placeholder={user.displayName} />
      </FormGroup>
      <FormGroup>
        <Label for="Email">Email</Label>
        <Input valid="true" readonly="readonly" type="email" name="email" id="email" placeholder={user.email} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Select a country</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Your news</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <br/>
      <Button color="primary" onClick={() => this.submit()}>Submit</Button>
    </Form></div> : null}

            </div>
        );
    }
}

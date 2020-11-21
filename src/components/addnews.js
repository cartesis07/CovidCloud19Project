import React from 'react';
import { Button, Form, FormGroup, Label, Input, Badge, Alert, Col, FormText } from 'reactstrap';

import { addCollection } from "../services/firebase"

import "./table.css"

import UserContext from '../userContext'
import { Country1 } from './country1';
import { TabRounded, TrainOutlined } from '@material-ui/icons';

export class AddNews extends React.Component {
    constructor(){
        super();
        this.state={
            submit: false,
            title: "",
            content: "",
            country: "Worldwide",
            date: "",
            email: "",
            imageUrl: "",
            countries: [],
            countriesID: [],
        }
    }

    static contextType = UserContext

    async fetchCall(){
      var response = await fetch("https://api.covid19api.com/countries")
      if(response.ok){
        const data = await response.json()
        var length = Object.keys(data).length;
        this.setState(prev => ({
          countries: [...prev.countries, "Worldwide"]
        }))
        this.setState(prev => ({
          countriesID: [...prev.countriesID, "WW"]
        }))
        for (let i = 0; i < length; i++){
          this.setState(prev => ({
            countries: [...prev.countries, data[i].Country]
        }))
        this.setState(prev => ({
          countriesID: [...prev.countriesID, data[i].ISO2]
        }))
        }
      }
    }

    renderCountriesInputs(){
      return this.state.countries.map((Country, index) => {
        const country = Country
          return(
            <option key={country}>{country}</option>
          );
      })
    }

    componentDidMount(){
      this.fetchCall();
    }

    submit(){
        console.log(this.state)
        //this.setState({submit: true})
    }

    render(){
        const { user, updateUser } = this.context
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
        <Input value={this.state.country} onChange={e => this.setState({ country: e.target.value })} type="select" name="select" id="exampleSelect">
            {this.renderCountriesInputs()}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="Headline">Your article headline</Label>
        <Input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} 
        type="headline" name="headline" id="headline"/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Your news</Label>
        <Input   value={this.state.name} onChange={e => this.setState({ name: e.target.value })} 
        type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup row>
        <Label for="exampleFile" sm={2}>Thumbnail</Label>
        <Col sm={10}>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            You can add a thumbnail for your article.
          </FormText>
        </Col>
      </FormGroup>
      <br/>
      <Button color="primary" onClick={() => this.submit()}>Submit</Button>
    </Form></div> : null}

            </div>
        );
    }
}

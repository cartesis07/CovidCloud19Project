import React from 'react';
import { Button, Form, FormGroup, Label, Input, Badge, Alert, Col, FormText, Spinner } from 'reactstrap';

import { addCollection } from "../services/firebase"

import "./table.css"

import UserContext from '../userContext'
import { Country1 } from './country1';
import { TabRounded, TrainOutlined } from '@material-ui/icons';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class AddNews extends React.Component {
    constructor(){
        super();
        this.state={
            submit: false,
            title: "",
            content: "",
            country: "Worldwide",
            countryref: "WW",
            date: "",
            email: "",
            countries: [],
            countriesID: [],
            titlevalid: "",
            contentvalid: "",
            loaded: false,
            image: "",
            imagevalid: "",
        }
    }

    static contextType = UserContext

    createNotification(type,content){
      switch (type) {
        case 'info':
          NotificationManager.info(content);
          break;
        case 'success':
          NotificationManager.success('Success',content);
          break;
        case 'warning':
          console.log("coucoicipeifjzpeifh")
          NotificationManager.warning('Warning',content, 3000);
          break;
        case 'error':
          NotificationManager.error(content, 5000, () => {
            alert('callback');
          });
          break;
        }
    }

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
      this.setState({loaded: true})
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

    handleImageasFile = (e) => {
      const image = e.target.files[0]
      this.setState({image: image})
    }

    async submit(){
        const date1 = new Date();
        this.setState({date: date1.toString()})
        console.log(this.state)
        if (this.state.title === ""){
            this.setState({titlevalid: "false"})
        }
        if (this.state.content === ""){
          this.setState({contentvalid: "false"})
        } 
        if (this.state.image === ""){
          console.log("coucou")
          this.createNotification('warning',"Please, upload an image to add this news to our database.")
        }
        if (this.state.content !== "" && this.state.title !== "" && this.state.image !== ""){
          this.setState({contentvalid: ""})
          this.setState({titlevalid: ""})
          this.setState({imagevalid: ""})
          var index = this.state.countries.indexOf(this.state.country)
          await this.setState({countryref: this.state.countriesID[index]})
          this.createNotification('info','Your news is currently being uploaded in our database')
          await addCollection(this.state.title, this.state.content, this.state.country, this.state.countryref, date1.getTime(), this.state.email, this.state.image)
          this.createNotification('success','Congratulations, your news has been uploaded to our database')
          this.setState({submit: true})
        }
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

      {!this.state.loaded && user ? <Spinner className="Spinner" color="primary"/> : null}        
      {!this.state.submit && user !== null && this.state.loaded?
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
        <Input onLoad = {() => this.setState({email: user.email})} valid="true" readonly="readonly" type="email" name="email" id="email" placeholder={user.email} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Select a country</Label>
        <Input value={this.state.country} onChange={e => this.setState({ country: e.target.value })} type="select" name="select" id="exampleSelect">
            {this.renderCountriesInputs()}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="Headline">Your article headline</Label>
        <Input  invalid={this.state.titlevalid} value={this.state.title} onChange={e => this.setState({ title: e.target.value, email: user.email})} 
        type="headline" name="headline" id="headline"/>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Your news</Label>
        <Input  invalid={this.state.contentvalid} value={this.state.content} onChange={e => this.setState({ content: e.target.value })} 
        type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup row>
        <Label for="exampleFile" sm={2}>Thumbnail</Label>
        <Col sm={10}>
          <Input type="file" name="file" id="exampleFile" onChange={this.handleImageasFile}/>
          <FormText color="muted">
            You can add a thumbnail for your article.
          </FormText>
        </Col>
      </FormGroup>
      <br/>
      <Button color="primary" onClick={() => this.submit()}>Submit</Button>
    </Form></div> : null}
    <NotificationContainer/>
            </div>
        );
    }
}

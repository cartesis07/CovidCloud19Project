import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table, Spinner, Alert } from 'reactstrap';
import { Pie } from "react-chartjs-2";

import "./table.css"

import ReactCountryFlag from "react-country-flag"

export class Country1 extends React.Component {

    constructor(){
        super();
        this.state = {NewConfirmed: "",
                      TotalConfirmed: "",
                      NewDeaths: "",
                      TotalDeaths: "",
                      NewRecovered: "",
                      TotalRecovered: "",
                      ActiveCases: "",
                      countryref: "",
                      name:"",
                      loaded: false,
                      error: false,
                      countryerror: false,
        }
    }

    async fetchCall(){
        var response = await fetch("https://api.covid19api.com/summary")
        if (response.ok){
            const data = await response.json()

            var getObjectByValue = function (array, key, value) {
                return array.filter(function (object) {
                    return object[key] === value;
                });
            };
            let country  = getObjectByValue(data.Countries, "CountryCode", this.state.countryref )
            if (country[0] !== undefined){
                this.setState({name: country[0].Country})
                this.setState({NewConfirmed: country[0].NewConfirmed})
                this.setState({TotalConfirmed: country[0].TotalConfirmed})
                this.setState({NewDeaths: country[0].NewDeaths})
                this.setState({NewRecovered: country[0].NewRecovered})
                this.setState({TotalRecovered: country[0].TotalRecovered})
                this.setState({TotalDeaths: country[0].TotalDeaths})
                this.setState({ActiveCases: this.state.TotalConfirmed - this.state.TotalDeaths - this.state.TotalRecovered})
                this.setState({loaded: true})
            }
            else{
                this.setState({countryerror: true})
            }
        }
        else{
            this.setState({error: true})
        }
    }

    componentDidMount(){
        this.setState({countryref: window.location.href.substring(window.location.href.lastIndexOf('/') + 1)})
        this.fetchCall();
    }

    render() {
        return(
            <div>
        {this.state.countryerror ? 
                    <section class="jumbotron text-center" className="jumbotron">
                    <div class="container">
                      <h1 class="jumbotron-heading">Oops... this country does not exist !</h1>
                      <p class="lead">The country you are looking for does not exist.<br/>
                      How you got here is a mystery. <br/>
                      But you can click the button below to go back to the homepage.
                      </p>
                      <p>
                        <a href="/" class="btn btn-primary my-2">Home</a>
                      </p>
                    </div>
                  </section>: null }
        
        {!this.state.countryerror ? <section class="jumbotron text-center" className="jumbotron">
        <div class="container">
          <ReactCountryFlag
                className="emojiFlag"
                countryCode={this.state.countryref}
                style={{
                    fontSize: '5em',
                    lineHeight: '1em',
                }}
          />
          <h1 class="jumbotron-heading">Last Covid19 News and Statistics from {this.state.name}</h1>
          <p class="lead">These are the last news and statistics from {this.state.name} stored in our firebase real-time database !<br/> You can also contribute by signing in with Google and becoming an eligible user.</p>
        </div>
      </section> : null}


            {this.state.error ? <Alert className="block1" color="danger">
        <h4 className="alert-heading">Oops, API call error</h4>
        <p>
          This website is running with the free version of <a href="https://covid19api.com" target="_blank">COVID19API</a>, so it is unfortunately rate-limited.
        </p>
        <hr />
        <p className="mb-0">
          Please, try to <a href="javascript:window.location.href=window.location.href">refresh</a> this page to display this data !
        </p>
        </Alert> : null}
                <div className="block1">
                {!this.state.loaded && !this.state.error && !this.state.countryerror ? <Spinner className="Spinner" color="primary"/> : null}        
                {this.state.loaded ? <Table borderless hover>
                <thead>
                    <tr class="table-warning">
                        <th colspan="2" className="text-center">{this.state.name} cases</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-warning">
                        <th scope="row">Total Cases &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                        <td>{this.state.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-warning">
                        <th scope="row">New Cases</th>
                        <td>{this.state.NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-warning">
                        <th scope="row">Active Cases</th>
                        <td>{this.state.ActiveCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr class="table-primary">
                        <th colspan="2" className="text-center">{this.state.name} recoveries</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-primary">
                        <th scope="row">Total Recovered</th>
                        <td>{this.state.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-primary">
                        <th scope="row">New Recovered</th>
                        <td>{this.state.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-primary">
                        <th scope="row">Recovery Rate</th>
                        <td>{Math.round(this.state.TotalRecovered/this.state.TotalConfirmed * 10000) / 100} %</td>
                    </tr>
          </tbody>
                <thead>
                    <tr class="table-danger">
                        <th colspan="2" className="text-center">{this.state.name} deaths</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-danger">
                        <th scope="row">Total Deaths</th>
                        <td>{this.state.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-danger">
                        <th scope="row">New Deaths</th>
                        <td>{this.state.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                    <tr class="table-danger">
                        <th scope="row">Fatality Rate</th>
                        <td>{Math.round(this.state.TotalDeaths/this.state.TotalConfirmed * 10000) / 100} %</td>
                    </tr>
          </tbody>
            </Table> : null} 
            </div>
            <div className="Pie">
            {!this.state.loaded && !this.state.error && !this.state.countryerror ? <Spinner className="Spinner" color="primary"/> : null}        
            {this.state.loaded ? <Pie data={{
            labels: ["Active Cases", "Recovered Cases", "Dead Cases"],
            datasets: [
              {
                data: [Math.round((this.state.ActiveCases/(this.state.ActiveCases+this.state.TotalRecovered+this.state.TotalDeaths) * 10000)) / 100, 
                       Math.round((this.state.TotalRecovered/(this.state.ActiveCases+this.state.TotalRecovered+this.state.TotalDeaths) * 10000 ))/ 100, 
                       Math.round((this.state.TotalDeaths/(this.state.ActiveCases+this.state.TotalRecovered+this.state.TotalDeaths)* 10000 ))/ 100],
                backgroundColor: [
                "rgba(255, 177, 101,0.8)",
                "rgba(98,  182, 239,0.8)",
                "rgba(255, 134,159,0.8)",
                ],
                hoverBackgroundColor: [
                  "#FFC870",
                  "#5AD3D1",
                  "#FF5A5E",
                ],
                borderColor: "#282c34",
                borderWidth: "5",
              }
            ]
          }} options={{responsive: true, title: {
            display: true,
            text: this.state.name + ' Cases Distribution',
            fontColor: "white",
            fontSize: 25,
        }, legend: {
            labels: {
               fontColor: 'white'
            }
         }}} /> : null }
          </div>
            </div>
        );
    }
}
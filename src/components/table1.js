import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import { Table } from 'reactstrap';
import {VictoryPie, VictoryLegend} from 'victory'

import "./table1.css"

//summary of worldwide cases, recoveries and deaths.
//not all values are found in the API call

//we use victory charts

export class Table1 extends React.Component {

    constructor(){
        super();
        this.state = {NewConfirmed: "",
                    TotalConfirmed: "",
                    NewDeaths: "",
                    TotalDeaths: "",
                    NewRecovered: "",
                    TotalRecovered: "",
                    ActiveCases: ""}
    }

    componentDidMount(){
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            const xhr2 = JSON.parse(xhr.responseText);
            this.setState({NewConfirmed: xhr2.Global.NewConfirmed})
            this.setState({TotalConfirmed: xhr2.Global.TotalConfirmed})
            this.setState({NewDeaths: xhr2.Global.NewDeaths})
            this.setState({NewRecovered: xhr2.Global.NewRecovered})
            this.setState({TotalRecovered: xhr2.Global.TotalRecovered})
            this.setState({TotalDeaths: xhr2.Global.TotalDeaths})
            this.setState({ActiveCases: this.state.TotalConfirmed - this.state.TotalDeaths - this.state.TotalRecovered})
        })
        xhr.open('GET', 'https://api.covid19api.com/summary');
        xhr.send();

    }
    render(){
        return(
            <div>
                <div className="block1">
                <Table borderless hover>
                <thead>
                    <tr class="table-warning">
                        <th colspan="2" className="text-center">Worldwide cases</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-warning">
                        <th scope="row">Total Cases</th>
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
            </Table>
            </div>
            <div className="block1">
            <Table borderless hover>
                <thead>
                    <tr class="table-primary">
                        <th colspan="2" className="text-center">Worldwide recoveries</th>
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
            </Table>
            </div>
            <div className="block1">
            <Table borderless hover>
                <thead>
                    <tr class="table-danger">
                        <th colspan="2" className="text-center">Worldwide deaths</th>
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
                        <th scope="row">Mortality Rate</th>
                        <td>{Math.round(this.state.TotalDeaths/this.state.TotalConfirmed * 10000) / 100} %</td>
                    </tr>
          </tbody>
            </Table> 
            </div>
            <div className="table1">
            <VictoryPie
                data={[
                { x: "", y: this.state.TotalDeaths,},
                 { x: "", y: this.state.TotalConfirmed },
                 { x: "", y: this.state.TotalRecovered },
                ]}
                colorScale={["#ff6b7c", "#6bb5ff", "#ffdc66"]}
            /> 
            </div>
            <VictoryLegend x={50} y={0}
            title="Cases distribution worldwide"
            centerTitle
            orientation="horizontal"
            gutter={20}
            style={{ border: { stroke: "white" }, title: {fontSize: 20, fill: "white" } }}
            data={[
                    { name: "Dead Cases", symbol: { fill: "#ff6b7c" }, labels: {fill: "white"} },
                    { name: "Recovered Cases", symbol: { fill: "#6bb5ff" }, labels: {fill: "white"} },
                    { name: "Active Cases", symbol: { fill: "#ffdc66" }, labels: {fill: "white"} }
                ]}
            />
            </div>
            );
    }
}

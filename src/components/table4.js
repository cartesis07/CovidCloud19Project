import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap';

import { Spinner } from 'reactstrap';

import "./table.css"

export class Table4 extends React.Component {

    constructor(){
        super();
        this.state={
            countries: [],
            loaded: false
        }
    }

    componentDidMount(){
        fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => {
            var length = Object.keys(data.Countries).length;
            for (let i = 0; i < length; i++){
                var tmpjson = {country: data.Countries[i].Country,
                               newcases: data.Countries[i].NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                               totalcases: data.Countries[i].TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                               newrecoveries: data.Countries[i].NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                               totalrecoveries: data.Countries[i].TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                               newdeaths: data.Countries[i].NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                               totaldeaths: data.Countries[i].TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                               countrycode: data.Countries[i].CountryCode}
                this.setState(prev => ({
                    countries: [...prev.countries, tmpjson]
                }))
            }
            this.setState({loaded: true})
        });
    }

    renderTableData(){
        return this.state.countries.map((Country, index) => {
            var string = "/countries/"
            const { country, newcases, totalcases, newrecoveries, totalrecoveries, newdeaths, totaldeaths, countrycode } = Country //destructuring
            return (
               <tr key={country}>
                  <td class="table-secondary"><a outline class="btn btn-outline-dark" href={"countries/" + countrycode}>{country}</a></td>
                  <td class="table-warning">{newcases}</td>
                  <td class="table-warning">{totalcases}</td>
                  <td class="table-primary">{newrecoveries}</td>
                  <td class="table-primary">{totalrecoveries}</td>
                  <td class="table-danger">{newdeaths}</td>
                  <td class="table-danger">{totaldeaths}</td>
               </tr>
            )
         })
    }

    render(){
        return(
            <div className = "CountriesTable">
            {!this.state.loaded ? <Spinner className="Spinner" color="primary"/> : null}        
            {this.state.loaded ? <Table borderless hover>
                <thead>
                    <tr className="table-secondary">
                        <th colspan="7" class="text-center">Cases, Recoveries and Deaths by Country</th>
                    </tr>
                </thead>
                <tbody className="table-secondary">
                    <th className = "stickyhead">Country</th>
                    <th className = "stickyhead">New Cases</th>
                    <th className = "stickyhead">Total Cases</th>
                    <th className = "stickyhead">New Recoveries</th>
                    <th className = "stickyhead">Total Recoveries</th>
                    <th className = "stickyhead">New Deaths</th>
                    <th className = "stickyhead">Total Deaths</th>
                </tbody>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </Table> : null}
            </div>
        );
    }
}
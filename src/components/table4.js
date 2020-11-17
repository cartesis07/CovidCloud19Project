import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap';

import { Spinner } from 'reactstrap';
 
import "./table.css"

import ReactCountryFlag from "react-country-flag"

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


export class Table4 extends React.Component {

    constructor(){
        super();
        this.state={
            countries: [],
            loaded: false,
            currentSort: "0"
        }
    }

    componentDidMount(){
        fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => {
            var length = Object.keys(data.Countries).length;
            for (let i = 0; i < length; i++){
                var tmpjson = {country: data.Countries[i].Country,
                               newcases: data.Countries[i].NewConfirmed, 
                               totalcases: data.Countries[i].TotalConfirmed, 
                               newrecoveries: data.Countries[i].NewRecovered, 
                               totalrecoveries: data.Countries[i].TotalRecovered,
                               newdeaths: data.Countries[i].NewDeaths, 
                               totaldeaths: data.Countries[i].TotalDeaths,
                               countrycode: data.Countries[i].CountryCode}
                this.setState(prev => ({
                    countries: [...prev.countries, tmpjson]
                }))
            }
            this.setState({loaded: true})
        }).catch(function() {
            console.log("error");
        });
    }

    onSort(event, sortKey){
        if (sortKey === "country"){
            const data = this.state.countries;
            data.sort(function(a,b){if(a.country.toLowerCase() < b.country.toLowerCase()) return -1;
            if(a.country.toLowerCase() > b.country.toLowerCase()) return 1;
            return 0;});
            this.setState({countries: data})
        }
        else{
            const data = this.state.countries;
            data.sort(function(a, b){return a[sortKey] - b[sortKey]})
            this.setState({countries: data})
        }
      }

    renderTableData(){
        return this.state.countries.map((Country, index) => {
            var string = "/countries/"
            const { country, newcases, totalcases, newrecoveries, totalrecoveries, newdeaths, totaldeaths, countrycode } = Country //destructuring
            return (
               <tr key={country}>
                  <td class="table-secondary"><ReactCountryFlag countryCode={countrycode} />&nbsp;&nbsp;&nbsp;<a outline class="btn btn-outline-dark" href={"countries/" + countrycode}>{country.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</a></td>
                  <td class="table-warning">{newcases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-warning">{totalcases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-primary">{newrecoveries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-primary">{totalrecoveries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-danger">{newdeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                  <td class="table-danger">{totaldeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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
                    <th onClick={e => this.onSort(e, 'country')} className = "stickyhead">Country<br/><ArrowDropDownIcon/><ArrowDropUpIcon/></th>
                    <th onClick={e => this.onSort(e, 'newcases')} className = "stickyhead">New Cases<br/><ArrowDropDownIcon/><ArrowDropUpIcon/></th>
                    <th onClick={e => this.onSort(e, 'totalcases')} className = "stickyhead">Total Cases<br/><ArrowDropDownIcon/><ArrowDropUpIcon/></th>
                    <th onClick={e => this.onSort(e, 'newrecoveries')} className = "stickyhead">New Recoveries<br/><ArrowDropDownIcon/><ArrowDropUpIcon/></th>
                    <th onClick={e => this.onSort(e, 'totalrecoveries')} className = "stickyhead">Total Recoveries<br/><ArrowDropDownIcon/><ArrowDropUpIcon/></th>
                    <th onClick={e => this.onSort(e, 'newdeaths')} className = "stickyhead">New Deaths<br/><ArrowDropDownIcon/><ArrowDropUpIcon/></th>
                    <th onClick={e => this.onSort(e, 'totaldeaths')} className = "stickyhead">Total Deaths<br/><ArrowDropDownIcon/><ArrowDropUpIcon/></th>
                </tbody>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </Table> : null}
            </div>
        );
    }
}
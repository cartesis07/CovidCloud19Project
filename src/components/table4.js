import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap';

import "./table.css"

export class Table4 extends React.Component {
    render(){
        return(
            <div className = "CountriesTable">
            <Table borderless hover>
                <thead>
                    <tr class="table-primary">
                        <th colspan="7" className="text-center">Cases by Country</th>
                    </tr>
                </thead>
                <thead>
                    <tr class="table-primary">
                        <th color="#fff" class="table-secondary" className="text-center">Country</th>
                        <th className="text-center">New Cases</th>
                        <th className="text-center">Total Cases</th>
                        <th className="text-center">New Recoveries</th>
                        <th className="text-center">Total Recoveries</th>
                        <th className="text-center">New Deaths</th>
                        <th className="text-center">Total Deaths</th>
                    </tr>
                </thead>
            </Table>
            </div>
        );
    }
}
import { Table1 } from "./table1"
import { Table2 } from "./table2"
import { Table3 } from "./table3"
import { Table4 } from "./table4"
import { TableNews } from "./tablenews"

import React from 'react';

import "../components/table.css"

export class Home extends React.Component {

    constructor(){
        super();
    }

    render(){
        return(
            <div className="Content">
                <TableNews/>
                <hr/>
                <Table1/>
                <Table2/>
                <Table3/>
                <Table4/>
            </div>
        );
    }
}
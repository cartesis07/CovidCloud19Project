import { Country1 } from "./country1"

import React from 'react';
import { Router } from "react-router-dom"

import "../components/table.css"

export class Countries extends React.Component {

    render(){
        return(
            <div className="Content">
                <Country1/>
            </div>
        );
    }
}
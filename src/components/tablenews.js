import React from 'react';
import "./table.css"
import 'bootstrap/dist/css/bootstrap.css';
import img from './background.jpg';
import img2 from './background2.jpg';
import img3 from './background3.jpg';

export class TableNews extends React.Component {
    constructor(){
        super();
    }

    componentDidMount(){
    }

    render(){
        return(
            <div className="maincontainer">
                <section class="jumbotron text-center" className="jumbotron">
        <div class="container">
          <h1 class="jumbotron-heading">Last Worldwide News about Covid19</h1>
          <p class="lead">These are the last worldwide news posted on our database. <br/> You can also contribute by signing in with Google and becoming an eligible user.</p>
          <p>
            <a href="/add-news" class="btn btn-primary my-2">Add News</a>
          </p>
        </div>
      </section>
            <div class="row">
              <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={img} alt="Card image cap"/>
                <div class="card-body">
                  <p class="card-text" className="cardbodytext">This is the news title</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
                </div>
                </div>
                <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={img2} alt="Card image cap"/>
                <div class="card-body">
                <p class="card-text" className="cardbodytext">This is the news title</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
                </div>
                </div>

                <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src={img3} alt="Card image cap"/>
                <div class="card-body">
                <p class="card-text" className="cardbodytext">This is the news title</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
                </div>
                </div>
            </div>
            </div>
        );
    }
}
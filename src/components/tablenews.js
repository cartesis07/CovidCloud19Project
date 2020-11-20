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

            <div class="card-deck">
  <div class="card">
    <img class="card-img-top" src={img} alt="Card image cap"/>
    <div class="card-body d-flex flex-column" >
      <h5 class="card-title" className="cardbodytexttitle">New Covid19 disease</h5>
      <p class="card-text" className="cardbodytext">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. zpiehfzpifhzepifhzpeifhzepifhzepifhzefpihezfpihzefpizehfpihezpifhzepifhzepifhzepifhzepfihzefpizehfpizhf</p>
      <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
    </div>
  </div>



  <div className="card">
    <img class="card-img-top" src={img2} alt="Card image cap"/>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title" className="cardbodytexttitle">Crazy chinese story</h5>
      <p class="card-text" className="cardbodytext">Very interesting content about this story written by some jouranlist</p>
      <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
    </div>
  </div>




  <div class="card">
    <img class="card-img-top" src={img3} alt="Card image cap"/>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title" className="cardbodytexttitle">Macron is working on the subject</h5>
      <p class="card-text" className="cardbodytext">Dont worry, Macron is working on it</p>
      <div class="d-flex justify-content-between align-items-center mt-auto">
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
        );
    }
}
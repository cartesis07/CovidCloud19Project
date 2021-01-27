import React from 'react';
import "./table.css"
import 'bootstrap/dist/css/bootstrap.css';

import { readCollectionCondition } from "../services/firebase"

export class CountryNews extends React.Component {
    constructor(){
        super();
        this.state={
          articles: [],
          loaded: false,
          carouselID: 0,
          numberofarticle: 0,
          position: 0,
          maxrange: 0,
          country: null,
          countryref: null
        }
    }

    async componentDidMount(){
      await this.setState({countryref: window.location.href.substring(window.location.href.lastIndexOf('/') + 1)})
      this.FireStoreCall();
    }

    async FireStoreCall(){
      await readCollectionCondition("news",this.state.countryref).then(result => this.readResult(result))      
      this.setState({loaded: true})
    }

    readResult(result){
      this.setState({numberofarticle: result.length})
      for (let i = 0; i < this.state.numberofarticle; i++){
          this.setState(prev => ({
            articles: [...prev.articles, result[i]]
          }))
      }
      this.setState({loaded: true});
      console.log(this.state);
    }

    render(){
        return(
            <div className="maincontainer">
            {this.state.articles.length === 0 && this.state.loaded ? 
                        <section class="jumbotron text-center" className="jumbotron">
                        <div class="container">
                          <h1 class="jumbotron-heading">There is currently no news about this country in our database.</h1>
                          <p class="lead">Do not hesitate to contribute by signing in with Google and becoming an eligible user.</p>
                        </div>
                      </section>
            : null}
            {this.state.articles.length > 0 ? <div class="card-deck align-items-center">
  {this.state.position !== 0 ? <a onClick={() => this.setState({position: (Math.abs(this.state.position - 3))%this.state.numberofarticle})}>
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a> : null}

  {this.state.loaded ? <div class="card">
  {this.state.articles[this.state.position] ? <img class="card-img-top" src={this.state.articles[this.state.position].imageURL} alt=""/> : null}
    <div class="card-body d-flex flex-column" >
    {this.state.articles[this.state.position] ?<h5 class="card-title cardbodytexttitle">{this.state.articles[this.state.position].title}</h5> : null}
    {this.state.articles[this.state.position] ? <p class="card-text cardbodytext">{this.state.articles[this.state.position].content}</p> : null}
      <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="btn-group">
                    {this.state.articles[this.state.position] ? <button type="button" class="btn btn-sm btn-outline-secondary">{this.state.articles[this.state.position].country}</button> : null}
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
    </div>
  </div> : null}

  {!this.state.loaded ? <div className="card placeholder">
  </div>
  : null  }

  {this.state.loaded ? <div className="card">
  {this.state.articles[this.state.position + 1] ?  <img class="card-img-top" src={this.state.articles[this.state.position + 1].imageURL} alt=""/> : null}
    <div class="card-body d-flex flex-column">
    {this.state.articles[this.state.position + 1] ? <h5 class="card-title cardbodytexttitle">{this.state.articles[this.state.position + 1].title}</h5> : null}
      {this.state.articles[this.state.position + 1] ? <p class="card-text cardbodytext">{this.state.articles[this.state.position + 1].content}</p> : null}
      <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="btn-group">
                    {this.state.articles[this.state.position + 1] ? <button type="button" class="btn btn-sm btn-outline-secondary">{this.state.articles[this.state.position + 1].country}</button> : null}
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
    </div>
  </div> : null}

  {!this.state.loaded ? <div className="card placeholder">
  </div>
  : null  }


  {this.state.loaded ? <div class="card">
  {this.state.articles[this.state.position + 2] ? <img class="card-img-top" src={this.state.articles[this.state.position + 2].imageURL} alt=""/> : null}
    <div class="card-body d-flex flex-column">
      {this.state.articles[this.state.position + 2] ? <h5 class="card-title cardbodytexttitle">{this.state.articles[this.state.position + 2].title}</h5> : null}
      {this.state.articles[this.state.position + 2] ? <p class="card-text cardbodytext">{this.state.articles[this.state.position + 2].content}</p> : null}
      <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="btn-group">
                    {this.state.articles[this.state.position + 2] ? <button type="button" class="btn btn-sm btn-outline-secondary">{this.state.articles[this.state.position + 2].country}</button> : null}
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
    </div>
  </div> : null }
  
  {!this.state.loaded ? <div className="card placeholder">
  </div>
  : null }


  {this.state.numberofarticle - this.state.position > 3 ? <a onClick={() => this.setState({position: (this.state.position + 3)%this.state.numberofarticle})}>
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a> : null}
  </div> : null}
</div>
        );
    }
}
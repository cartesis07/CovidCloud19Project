import React from 'react';
import "./table.css"
import 'bootstrap/dist/css/bootstrap.css';

import { readCollection } from "../services/firebase"

export class TableNews extends React.Component {
    constructor(){
        super();
        this.state={
          articles: [],
          loaded: false,
          carouselID: 0,
          numberofarticle: 0,
          position: 0,
          maxrange: 0,
          today: ""
        }
    }

    timeDifference(current, previous) {

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;
  
      var elapsed = current - previous;
  
      if (elapsed < msPerMinute) {
           return Math.round(elapsed/1000) + ' seconds ago';   
      }
  
      else if (elapsed < msPerHour) {
           return Math.round(elapsed/msPerMinute) + ' minutes ago';   
      }
  
      else if (elapsed < msPerDay ) {
           return Math.round(elapsed/msPerHour ) + ' hours ago';   
      }
  
      else if (elapsed < msPerMonth) {
          return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
      }
  
      else if (elapsed < msPerYear) {
          return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
      }
  
      else {
          return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
      }
  }

    componentDidMount(){
      var date = new Date();
      this.setState({today: date})
      this.FireStoreCall();
    }

    async FireStoreCall(){
      await readCollection("news").then(result => this.readResult(result))
      const myData = await [].concat(this.state.articles).sort((a, b) => a.date < b.date ? 1 : -1)  
      await this.setState({articles: myData})
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
                <section class="jumbotron text-center" className="jumbotron">
        <div class="container">
          <h1 class="jumbotron-heading">Last Worldwide News about Covid19</h1>
          <p class="lead">These are the last worldwide news posted on our database. <br/> You can also contribute by signing in with Google and becoming an eligible user.</p>
          <p>
            <a href="/add-news" class="btn btn-primary my-2">Add News</a>
          </p>
        </div>
      </section>

            <div class="card-deck align-items-center">
  {this.state.position !== 0 ? <a onClick={() => this.setState({position: (Math.abs(this.state.position - 3))%this.state.numberofarticle})}>
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a> : null}

  {this.state.loaded ? <div class="card">
  {this.state.articles[this.state.position] ? <img class="card-img-top" src={this.state.articles[this.state.position].imageURL} alt="Card image cap"/> : null}
    <div class="card-body d-flex flex-column" >
    {this.state.articles[this.state.position] ?<h5 class="card-title cardbodytexttitle">{this.state.articles[this.state.position].title}</h5> : null}
    {this.state.articles[this.state.position] ? <p class="card-text cardbodytext">{this.state.articles[this.state.position].content}</p> : null}
      <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="btn-group">
                    {this.state.articles[this.state.position] ? <button type="button" class="btn btn-sm btn-outline-secondary">{this.state.articles[this.state.position].country}</button> : null}
                    </div>
                    <small class="text-muted">{this.timeDifference(this.state.today.getTime(),this.state.articles[this.state.position].date)}</small>
                  </div>
    </div>
  </div> : null}

  {!this.state.loaded ? <div className="card placeholder">
  </div>
  : null  }

  {this.state.loaded ? <div className="card">
  {this.state.articles[this.state.position + 1] ?  <img class="card-img-top" src={this.state.articles[this.state.position + 1].imageURL} alt="Card image cap"/> : null}
    <div class="card-body d-flex flex-column">
    {this.state.articles[this.state.position + 1] ? <h5 class="card-title cardbodytexttitle">{this.state.articles[this.state.position + 1].title}</h5> : null}
      {this.state.articles[this.state.position + 1] ? <p class="card-text cardbodytext">{this.state.articles[this.state.position + 1].content}</p> : null}
      <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="btn-group">
                    {this.state.articles[this.state.position + 1] ? <button type="button" class="btn btn-sm btn-outline-secondary">{this.state.articles[this.state.position + 1].country}</button> : null}
                    </div>
                    {this.state.articles[this.state.position + 1] ? <small class="text-muted">{this.timeDifference(this.state.today.getTime(),this.state.articles[this.state.position + 1].date)}</small> : null}
                  </div>
    </div>
  </div> : null}

  {!this.state.loaded ? <div className="card placeholder">
  </div>
  : null  }


  {this.state.loaded ? <div class="card">
  {this.state.articles[this.state.position + 2] ? <img class="card-img-top img-responsive" src={this.state.articles[this.state.position + 2].imageURL} alt="Card image cap"/> : null}
    <div class="card-body d-flex flex-column">
      {this.state.articles[this.state.position + 2] ? <h5 class="card-title cardbodytexttitle">{this.state.articles[this.state.position + 2].title}</h5> : null}
      {this.state.articles[this.state.position + 2] ? <p class="card-text cardbodytext">{this.state.articles[this.state.position + 2].content}</p> : null}
      <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="btn-group">
                    {this.state.articles[this.state.position + 2] ? <button type="button" class="btn btn-sm btn-outline-secondary">{this.state.articles[this.state.position + 2].country}</button> : null}
                    </div>
                    {this.state.articles[this.state.position + 2] ? <small class="text-muted">{this.timeDifference(this.state.today.getTime(),this.state.articles[this.state.position + 2].date)}</small> : null}
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
  </div>
</div>
        );
    }
}
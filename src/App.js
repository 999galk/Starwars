import React, { Component } from 'react';
import logo from './logo.svg';
import Scroll from './Scroll';
import Characters from './Characters';
import ErrorBoundary from './ErrorBoundary';
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state = {
      filmName : '',
      filmDesc : '',
      actorsUrls : [],
      actors : [],
      searchfield : ''
    }
  }


  componentDidMount(){
    
    fetch('https://swapi.co/api/films/2/')
      .then(response => response.json())
      .then(filmData =>{
        this.setState({filmName : filmData.title,filmDesc : filmData.opening_crawl, actorsUrls : filmData.characters});
    }).finally(() => setActors());
    
    const setActors = async () => {
      const urls = this.state.actorsUrls;
      console.log('urls: ', urls);
      const act = await Promise.all(urls.map(url =>
      fetch(url).then(resp => resp.json()) 
      ));
      console.log('act arr: ', act);
      this.setState({actors : act});
    }
  }

  render(){
    console.log('actors:', this.state.actors);
      const { filmName, filmDesc, actors, searchfield } = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <h1 className='f2'>{filmName}</h1>
            <p className='tc'>
              {filmDesc}
            </p>
          </header>
          <Scroll>
            <ErrorBoundary>
               <Characters actors={actors} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
}

export default App;

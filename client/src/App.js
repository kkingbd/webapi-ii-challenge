import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Posts from './components/Posts';

const url = new URL('http://localhost:4000/api/posts/')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios
    .get(url)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => console.log(err))
  }

  addPost = data => {
    axios
    .post(url, data)
    .then(res => {
      this.setState({
        posts: res.data
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <NavLink to='/api/posts'>Home</NavLink>
        <Route exact path='/api/posts'
        render={props => <Posts posts={this.state.posts} {...props} />}
        />
      </div>
    );
  }
}

export default App;
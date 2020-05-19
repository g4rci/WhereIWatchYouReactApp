import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
        <div className="home">
        
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Welcome Where I Watch You</h1>
              <p className="lead">A great place to find where you can watch your favorite movies</p>
              <div className="mt-4">
                <Link className="btn btn-dark px-5 mr-3 mt-4" to="/signup">Create New Account</Link>
                <Link className="btn btn-dark px-5 mr-3 mt-4" to="/login">Login to Your Account</Link>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    )
  }
}
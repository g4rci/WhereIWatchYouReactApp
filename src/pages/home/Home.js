import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebase";

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="_background"></div>
        <div>
          <section>
            <div className="jumbotron-fluid py-5">
              <div className="container text-center py-5">
                <h1 className="transparent jumbotron display-4">
                  Welcome To Where I Watch You
                </h1>
                <p className="transparent jumbotron lead">
                  A great place to find where you can watch your favorite movies
                </p>
                {auth().currentUser ? (
                  <div className="mt-4">
                    <Link
                      className="transparent btn btn-light px-5 mr-3 mt-4"
                      to="/"
                      onClick={() => auth().signOut()}
                    >
                      LogOut
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4">
                    <Link
                      className="transparent btn btn-light px-5 mr-3 mt-4"
                      to="/signup"
                    >
                      Create New Account
                    </Link>
                    <Link
                      className="transparent btn btn-light px-5 mr-3 mt-4"
                      to="/login"
                    >
                      Login to Your Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

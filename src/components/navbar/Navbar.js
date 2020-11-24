import React from 'react'
import { auth } from '../../services/firebase';
import './NavBar.css'
import { Nav, Form, FormControl, Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { withRouter } from 'react-router-dom';

class Navigation extends React.Component {
  state = { name: ''};
  
  searchFilter = (search) => {
    this.setState({
      name: search.target.value,
    }); 
  };
  
  submitForm1 (e) {
    this.props.history.push(`/moviesearch/${this.state.name}`); 
  }

  submitForm2 (e) {
    this.props.history.push(`/showsearch/${this.state.name}`); 
  }
  
render () {
  
  const { name } = this.state
    return (
      <div className='navBar'>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Where I Watch You</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {auth().currentUser ?
              <Nav className="mr-auto">
              <Nav.Link href="/topmovies">Movies</Nav.Link>
              <Nav.Link href="/topshows">TvShows</Nav.Link>
              <Nav.Link href="/" onClick={() => auth().signOut()}>LogOut</Nav.Link>
              </Nav>
              :
              <Nav className="mr-auto">
              <Nav.Link href="/login">LogIn</Nav.Link>
              <Nav.Link href="/signup">SignUp</Nav.Link>
              </Nav>
            }
            {this.props.location.pathname.includes('/topmovies') ||
            this.props.location.pathname.includes('/moviesearch') ||
            this.props.location.pathname.includes('/moviedetails') ?
            <Form onSubmit={this.submitForm1.bind(this)} inline>
              <FormControl href={`/moviesearch/${this.state.name}`} className='mb-2 mt-2 mr-sm-2' value={name} onChange={this.searchFilter} type="search" placeholder="Search Movie" />
              <Button type='submit' className='mb-2 mt-2' href={`/moviesearch/${this.state.name}`} variant="outline-success" >Buscar</Button>
            </Form>
            :
            <Form onSubmit={this.submitForm2.bind(this)} inline>
              <FormControl href={`/showsearch/${this.state.name}`} className='mb-2 mt-2 mr-sm-2' value={name} onChange={this.searchFilter} type="search" placeholder="Search TvShow" />
              <Button type='submit' className='mb-2 mt-2' href={`/showsearch/${this.state.name}`} variant="outline-success" >Buscar</Button>
            </Form>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    ) 
    }}

    export default withRouter(Navigation)
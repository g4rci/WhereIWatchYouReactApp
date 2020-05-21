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
  
  submitForm (e) {
    this.props.history.push(`/moviesearch/${this.state.name}`); 
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
              <Nav.Link href="/topmovies">Home</Nav.Link>
              <Nav.Link href="/" onClick={() => auth().signOut()}>LogOut</Nav.Link>
              </Nav>
              :
              <Nav className="mr-auto">
              <Nav.Link href="/login">LogIn</Nav.Link>
              <Nav.Link href="/signup">SignUp</Nav.Link>
              </Nav>
            }
            <Form onSubmit={this.submitForm.bind(this)} inline>
              <FormControl href={`/moviesearch/${this.state.name}`} className='mb-2 mt-2 mr-sm-2' value={name} onChange={this.searchFilter} type="search" placeholder="eg: Avengers" />
              <Button type='submit' className='mb-2 mt-2' href={`/moviesearch/${this.state.name}`} variant="outline-success" >Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    ) 
    }}

    export default withRouter(Navigation)
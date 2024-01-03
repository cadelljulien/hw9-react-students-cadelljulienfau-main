import './App.css'; //Import for app
import React from 'react'; //Import for react
import 'bootstrap/dist/css/bootstrap.min.css'; //Import for bootstrap
import { Navbar, Nav, Container, NavDropdown  } from 'react-bootstrap'; //Import for nav
import { Link, Routes, Route } from 'react-router-dom'; //Import for routes
import Home from './pages/Home'; //Import for home
import AddStudent from './pages/AddStudent'; //Importfor add student
import UpdateStudent from './pages/UpdateStudent'; //Import for update student
import DeleteStudent from './pages/DeleteStudent'; //Import for delete student
import GetStudents from './pages/GetStudents'; //Import for get students
import GetStudent from './pages/GetStudent'; //Import for get students
import SearchStudent from './pages/SearchStudent'; //Import for search students

//App function for navbar built with bootstrap. Has link componets being used
//Uses routes for which connects it to index and pages
function App() {
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">Student Sever</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to='/AddStudent'>Add</Nav.Link>
                <Nav.Link as={Link} to='/UpdateStudent'>Update</Nav.Link>
                <Nav.Link as={Link} to='/DeleteStudent'>Delete</Nav.Link>
                <Nav.Link as={Link} to='/GetStudents'>List</Nav.Link>
                <Nav.Link as={Link} to='/GetStudent'>Display</Nav.Link>
                <Nav.Link as={Link} to='/SearchStudent'>Search</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#home">Home</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/AddStudent'>Add</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/UpdateStudent'>Update</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/DeleteStudent'>Delete</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/GetStudents'>List</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/SearchStudent'>Search</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/AddStudent" element={<AddStudent/>} />
        <Route path="/UpdateStudent" element={<UpdateStudent/>} />
        <Route path="/DeleteStudent" element={<DeleteStudent/>} />
        <Route path="/GetStudents" element={<GetStudents />}/>
        <Route path="/GetStudent" element={<GetStudent />}/>
        <Route path="/SearchStudent" element={<SearchStudent/>} />
      </Routes>

    </React.Fragment>
  );
}
//Export app
export default App;

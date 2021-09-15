import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Card, Row, Col, Button } from 'react-bootstrap';
import Carrousel from './components/carousel';
import './styles/global.scss';
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://api.rawg.io/api/games?key=1622ce4169fb4ad38704cbffe8d9edad');
      setData(response.data.results);
      console.log(response)
    }
    fetchData()
  }, [])

  return (
    <div className='main'>
      <Router>
        <div className="container">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">TODOAPP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Carrousel />
          <Switch>
            <Route path="/">
              <div className="container">
                <h1 style={{ textAlign: 'center' }}>List of games</h1>
              </div>
            </Route>
          </Switch>
          <Row xs={1} md={3} className="g-4">
            {data.map((item) => (
              <Col>
                <Card key={item.objectID} style={{ width: '18rem' }}>
                  <Card.Img variant="top" className='cardImg' resizeMode="center" src={item.background_image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}

      </Router>
    </div>

  );
}

export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Card, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import Carrousel from './components/carousel';
import './styles/global.scss';


const App = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [imageBack, setImageBack] = useState();
  const [name, setName] = useState();
  const [rating, setRating] = useState(0);
  const [ratingTop, setRatingTop] = useState(0);
  const [screenshot, setScreenshot] = useState();

  const handleClose = () => setShow(false);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://api.rawg.io/api/games?key=1622ce4169fb4ad38704cbffe8d9edad');
      setData(response.data.results);
      console.log(response);
    }
    fetchData()
  }, [])
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  const [cardList, setCardList] = useState([]);

  return (
    <Container className='main'>
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
                <Card style={{ width: '18rem' }}
                  onClick={() => {
                    handleShow();
                    const arr = [...cardList, { name, imageBack, rating, ratingTop, screenshot }];
                    setCardList(arr);
                    setImageBack(item.background_image);
                    setName(item.name);
                    setRating(item.rating);
                    setRatingTop(item.ratingTop);
                    setScreenshot(item.short_screenshots.map((item) => (item)));
                    console.log(item.short_screenshots.map((item, index) => (item[index])));
                  }}>
                  <Card.Img variant="top" className='cardImg' src={item.background_image} />
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
        <div className="modalView">
          <Modal show={show} onHide={handleClose} fullscreen={fullscreen} style={{ width: '100%' }}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <div className="divImage">
                    <img variant="top" className='modalImage' src={imageBack} />
                  </div>
                </Col>
                <Col>
                  <div className="divImage">
                    <h1>{name}</h1>
                    <h2>{rating}</h2>
                    <h3>{ratingTop}</h3>
                    <Row xs={1} md={3} className="g-4">
                      {cardList.map((item) => (
                        <Col>
                          <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" className='cardImg' src={screenshot}/>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Router>
    </Container >
  );
}

export default App;
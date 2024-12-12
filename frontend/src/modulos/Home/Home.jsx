import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Home.css'; // Asegúrate de tener este archivo CSS

const Home = () => {
  return (
    <div className="home-container">
      <Container className="text-center">
        <h1 className="home-title mb-4">Sistema de Gestión del Restaurante</h1>
        <Row className="justify-content-center">
          <Col md={3} sm={6} className="mb-3">
            <Link to="/inventario" style={{ textDecoration: 'none' }}>
              <Card className="home-card">
                <Card.Body>
                  <Card.Title>Inventario</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Link to="/menu" style={{ textDecoration: 'none' }}>
              <Card className="home-card">
                <Card.Body>
                  <Card.Title>Menú</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Link to="/mesas" style={{ textDecoration: 'none' }}>
              <Card className="home-card">
                <Card.Body>
                  <Card.Title>Mesas</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Link to="/pedidos" style={{ textDecoration: 'none' }}>
              <Card className="home-card">
                <Card.Body>
                  <Card.Title>Pedidos</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;

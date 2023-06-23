import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {/* children is whatever we pass in between the opening and closing tags of formContainer */}
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer;

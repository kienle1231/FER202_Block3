import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaTwitter, FaTiktok, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-top py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0 text-muted">
              Made with ❤️ and ✨
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="social-icons">
              <a href="#" className="text-muted me-3" title="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-muted me-3" title="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-muted me-3" title="TikTok">
                <FaTiktok size={20} />
              </a>
              <a href="#" className="text-muted" title="Pinterest">
                <FaPinterest size={20} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
export default class Popup extends Component {
    render() {
        return (
            <Modal show={this.props.toggle} >
          <Modal.Header closeButton onClick={this.props.handleClose}>
            <Modal.Title>Something wrong!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo,</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
          </Button>
            <Button variant="primary" onClick={this.props.handleRetry}>
              Retry
          </Button>
          </Modal.Footer>
        </Modal>
        )
    }
}

import React, { Component } from 'react';
import {connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import {Modal,  Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchData, fetchDataFail, toggle} from './actions';
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
     
      toggle: false
    }
  }
  onChange = input => this.setState({ input: input.target.value });


  handleReq = async () => {
    const { input } = this.state;
    let urls = [];
    for(let i =0;i<input;i++) urls.push(`https://reqres.in/api/users/${i+1}`);
    function getAllData(urls){
      return Promise.all(urls.map(fetchData));
    }
    
    function fetchData(URL) {
    return new Promise((resolve, reject) => {
      return axios
        .get(URL)
        .then(function(response) {
          resolve(response.data.data)
        })
        .catch(function(error) {
          resolve(error.response);
        });
    })
    }
  const res = await getAllData(urls);
  this.props.fetchData(res);
  if(this.props.store.countFail) this.setState({toggle:true})
  }
  handleRetry =  async () => {
    
    function getAllData(urls){
      return Promise.all(urls.map(fetchData));
    }
    
    function fetchData(URL) {
    return new Promise((resolve, reject) => {
      return axios
        .get(URL)
        .then(function(response) {
          resolve(response.data.data)
        })
        .catch(function(error) {
          resolve(error.response);
        });
    })
    }
  const res = await getAllData(this.props.store.failReq);
  this.props.fetchDataFail(res);
  if(this.props.store.countFail) this.setState({toggle:true})
  }
    
  
  handleClose = () => {
   this.setState({toggle: false});
    
  }

  render() {
    const { input,toggle } = this.state;
 
    const element = this.props.store.people.map(itemPeople => (<div><p>{itemPeople.email}</p><p>{itemPeople.first_name}</p><img src={itemPeople.avatar}></img></div>));
    console.log(this.props.store)
   
    return (

      <div className="App">
       <Modal show={toggle} > 
          <Modal.Header closeButton onClick={this.handleClose}>
            <Modal.Title>Something wrong!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo,</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
            <Button variant="primary" onClick={this.handleRetry}>
              Retry
          </Button>
          </Modal.Footer>
        </Modal> 
        <TextField id="standard-basic" label="Nhập" onChange={this.onChange} />
        <Button variant="primary" onClick={this.handleReq}>sync</Button>
        {element}
        <div style={{ position: 'fixed', bottom: 0, right: '10px' }}>
          <h3>Success:{this.props.store.countSuccess}/{this.props.store.total}</h3>
          <h3>Fail: {this.props.store.countFail}/{this.props.store.total} </h3>
        </div>
       
      </div>
    );
  }

}
function mapStateToProp(state) {
  return {
    store: state.people  
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchData: data => dispatch(fetchData(data)),
    fetchDataFail: data => dispatch(fetchDataFail(data)),
  
  };
};
export default connect(mapStateToProp,mapDispatchToProps)(App)

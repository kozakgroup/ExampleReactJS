import React, { Component } from 'react';
import firebase from '../services/firebase';
import api from '../services/api';
import { ListGroup, ListGroupItem, Button, Modal, FormControl, FormGroup, ControlLabel  } from 'react-bootstrap';
const defaultState = {
  selectedItem: {},
  modalShow: false,
  subjects: []
}

class List extends Component {
  async componentDidMount() {
    firebase.onUpdate((subjects)=>{
      this.setState({ subjects })
    });
    this.setState(defaultState)
  }

  onChange(field, input) {
    this.setState({
      selectedItem: Object.assign({}, this.state.selectedItem, {[field]: input.target.value})
    })
  }

  async onSave() {
    const { isNew, ...item } = this.state.selectedItem;
    await api.updateSubject(item);
    this.closeModal();
  }

  async onCreate() {
    const { isNew, ...item } = this.state.selectedItem;
    await api.createSubject(item);
    this.closeModal();
  }

  async onDelete(id) {
    await api.removeSubject(id);
  }

  openModal(s){
    this.setState({
      selectedItem: s,
      modalShow: true
    });
  }

  closeModal(){
    this.setState({
      selectedItem: {},
      modalShow: false
    });
  }

  render() {
    const { subjects, modalShow, selectedItem } = this.state;

    let actionButton;
    let title;
    if(selectedItem.isNew){
      actionButton = (<Button onClick={this.onCreate.bind(this)}>Create</Button>);
      title = 'Create new subject';
    } else {
      actionButton = (<Button onClick={this.onSave.bind(this)}>Update</Button>);
      title = 'Update subject';
    }

    const form = (
      <form>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Subject name</ControlLabel>
          <FormControl
            type="text"
            value={selectedItem.name ? selectedItem.name : ''}
            placeholder="Name"
            onChange={this.onChange.bind(this, 'name')}
          />
          <ControlLabel>Subject description</ControlLabel>
          <FormControl
            type="text"
            value={selectedItem.description ? selectedItem.description : ''}
            placeholder="Description"
            onChange={this.onChange.bind(this, 'description')}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );

    const modal = (
      <Modal key="modal" show={modalShow} onHide={this.closeModal.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
            {actionButton}
        </Modal.Footer>
      </Modal>
    );

    const list = (
      <div key="list">
        <ListGroup>
          {subjects.map((s, i) =>
          <ListGroupItem header={s.name} key={i} bsStyle="success" active={s.id === selectedItem.id}>
              <span>{s.description}</span>
              <span className="buttons">
                <Button onClick={this.onDelete.bind(this, s.id)} bsStyle="danger">Delete</Button>
                <Button onClick={this.openModal.bind(this, s)}>Update</Button>
              </span>
          </ListGroupItem>)}
        </ListGroup>
      </div>
    );

    const emptyList =  (<div className="list-empty" key="emptyList">List is empty</div>);
    const buttonAdd = (
      <Button className="center-block" key="buttonAdd" onClick={this.openModal.bind(this, {name: '', description: '', isNew: true})}>
        Add subject
      </Button>
    );

    return subjects.length ? [list, buttonAdd, modal] : [emptyList, buttonAdd, modal];
  }
}

export default List;

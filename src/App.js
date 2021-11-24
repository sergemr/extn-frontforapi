import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ajaxTask from './services/FetchTask';
import { Card,Modal,Button,Alert,InputGroup,FormControl} from 'react-bootstrap';
class App extends Component {
  state = {
    list: [],
    show :false,
    taskselect:[],
    variant:'',
    idx:'0',
    alert:true
  }

   componentDidMount()
  {
    this.getData();
  }

  async getData()
  {

    let task = await ajaxTask.fetchTasks();
    this.setState({list:task});
  }

   handleClose(){ 
     this.setState({show :false});
  }
   handleShow(task){ 
     this.setState({show :true});
     this.setState({taskselect :task.task});
  }

  async completeTask(task)
  {
    let res  = await ajaxTask.putTasks(task);
    if(typeof res.value != 'undefined')
    {
      this.setState({show :false});
      this.setState({variant :'primary'});
      this.setState({idx :res.value});
      this.setState({alert :false});
      setTimeout(() => {
        this.setState({alert :true});
      }, 3000)
    }
  }

  async reloadTask(value)
  {
    let task = await ajaxTask.fetchTasks(value);
    this.setState({list:task});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Alert hidden={this.state.alert} style={{ width: '18rem' }} key={this.state.idx} variant={this.state.variant}>
               {this.state.idx} 
          </Alert>
          <InputGroup className="mb-3" style={{ width: '18rem' }}>
            <InputGroup.Text>Task number</InputGroup.Text>
            <FormControl type="number" className="Size-alert" aria-label="First name" onChange={(element) => {
                this.reloadTask(element.target.value);
              }} />
          </InputGroup>
          { this.state.list.map((task) => (
          <Card style={{ width: '18rem' }} className="mt-2">
            <Card.Body>
              <Card.Title className="Card-title">{task.title}</Card.Title>

              <Button variant="secondary Card-button"
              key={`${task.id}`}  onClick={() => {
                this.handleShow({task});
              }}>Detail</Button>
            </Card.Body>
          </Card>
          ))}
        </header>
        <Modal show={this.state.show} onHide={()=>{this.handleClose()}}>
        <Modal.Header closeButton>
          <Modal.Title>Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Titulo: {this.state.taskselect.title}</p>
          <p>ID: {this.state.taskselect.id}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
                this.handleClose();
              }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
                this.completeTask(this.state.taskselect);
              }}>
            Complete task
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }


}
export default App;

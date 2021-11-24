import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ajaxTask from "./services/FetchTask";
import {
  Card,
  Modal,
  Button,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
class App extends Component {
  state = {
    list: [],
    show: false,
    taskselect: [],
    variant: "",
    idx: "0",
    alert: true,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let task = await ajaxTask.fetchTasks();
    this.setState({ list: task });
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow(task) {
    this.setState({ show: true, taskselect: task.task });
  }

  async completeTask(task) {
    let res = await ajaxTask.putTasks(task);
    if (typeof res.value != "undefined") {
      this.setState({ show: false, alert: false, variant: "primary",idx: res.value });
      
      setTimeout(() => {
        this.setState({ alert: true });
      }, 3000);
    }
  }

  async reloadTask(value) {
    let task = await ajaxTask.fetchTasks(value);
    this.setState({ list: task });
  }

  render()
 {
  const{variant,alert,idx, show,list, taskselect }=this.state;

    return (
      <div className="App">
        <header className="App-header">
        <h1>Todo List</h1>


          <Alert
            hidden={alert}
            style={{ width: "18rem" }}
            key={this.state.idx}
            variant={variant}
          >
            {idx}
          </Alert>
          <InputGroup className="mb-3" style={{ width: "18rem" }}>
            <InputGroup.Text>Number of Tasks</InputGroup.Text>
            <FormControl
              type="number"
              className="Size-alert"
              aria-label="First name"
              onChange={(element) => {
                this.reloadTask(element.target.value);
              }}
            />
          </InputGroup>
          <div style={{maxWidth:1200}} class="container-fluid">
              <div class="row" >
          {list.map((task) => (
           
                <Card style={{ minWidth: "18rem", minHeight:"7rem" }} className="col-lg-4 col-md-6 col-sm-12">
                  <Card.Body>
                    <Card.Title className="Card-title">{task.title}</Card.Title>

                    <Button
                      variant="secondary Card-button"
                      key={`${task.id}`}
                      onClick={() => {
                        this.handleShow({ task });
                      }}
                    >
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
           
          ))}
             </div>
             </div>
        </header>
        <Modal
          show={show}
          onHide={() => {
            this.handleClose();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Titulo: {taskselect.title}</p>
            <p>ID: {taskselect.id}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.handleClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.completeTask(taskselect);
              }}
            >
              Complete task
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default App;

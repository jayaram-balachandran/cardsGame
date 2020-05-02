import React, { Component } from "react";
import {
  Button,
  Container,
  InputGroup,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { uuid } from "uuidv4";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: "",
      enteredRoomId: "",
    };
  }

  createGame = () => {
    const userId = uuid();
    fetch("/api/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        enteredRoomId,
      }),
    })
      .then((res) => res.json())
      .then((roomDetail) => {
        this.setState({
          roomId: roomDetail._id,
        });
      });
  };

  joinGame = () => {
    const { enteredRoomId } = this.state;
    fetch("/api/joinGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enteredRoomId,
      }),
    })
      .then((res) => res.json())
      .then((roomDetail) => {
        this.setState({
          roomId: roomDetail._id,
        });
      });
  };

  setEnteredGameId = (enteredRoomId) => {
    this.setState({
      enteredRoomId,
    });
  };

  render() {
    const { roomId } = this.state;
    // const roomId = this.state.roomId
    return (
      <Container>
        <Row>
          <Col>
            <Button variant="primary" className="m-5" onClick={this.createGame}>
              Create Game
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Join game using roomid"
                aria-label="roomId"
                aria-describedby="basic-addon1"
                onChange={(e) => this.setEnteredGameId(e.target.value)}
              />
            </InputGroup>
            <Button variant="secondary" className="m-5" onClick={this.joinGame}>
              Join Game
            </Button>
            {roomId ? (
              <h1>Ask you friends to join in the room id : {roomId}</h1>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

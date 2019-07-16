import React from "react";
import { WSAvcPlayer } from "h264-live-player";
import { Button, Icon, Placeholder, Card } from "semantic-ui-react";

class VideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isConnected: false, isPlaying: false };
    this.protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    this.hostname = window.location.hostname;

    this.handleConnectDisconnect = this.handleConnectDisconnect.bind(this);
    this.handlePlayStopClick = this.handlePlayStopClick.bind(this);
  }

  componentDidMount() {
    this.wsavc = new WSAvcPlayer(this.canvas, "webgl");
  }

  componentWillUnmount() {
    this.wsavc.disconnect();
    this.wsavc.destroy();
  }

  handlePlayStopClick() {
    if (this.state.isPlaying) {
      this.wsavc.stopStream();
      this.setState({ isPlaying: false });
    } else {
      this.wsavc.playStream();
      this.setState({ isPlaying: true });
    }
  }

  handleConnectDisconnect() {
    if (this.state.isConnected) {
      this.wsavc.disconnect();
      this.setState({ isConnected: false, isPlaying: false });
    } else {
      this.wsavc.connect(`${this.protocol}//${this.hostname}:4242/video`);
      this.setState({ isConnected: true, isPlaying: true });
    }
  }

  render() {
    const playStopText =
      this.state.isConnected && this.state.isPlaying ? "Stop" : "Play";
    const connectDisconnectText = this.state.isConnected
      ? "Disconnect"
      : "Connect";

    return (
      <div>
        <Card.Group>
          <Card style={{ width: 800 }}>
            <Card.Content textAlign="center">
              <canvas
                ref={canvas => (this.canvas = canvas)}
                hidden={!this.state.isConnected}
                style={{ margin: "auto" }}
              />
              <Placeholder
                style={{ height: 394 }}
                hidden={this.state.isConnected}
                fluid
              >
                <Placeholder.Image rectangular />
              </Placeholder>
            </Card.Content>
            <Card.Content textAlign="center" extra>
              <Button
                onClick={this.handlePlayStopClick}
                icon
                labelPosition="left"
                style={{ marginLeft: "1em" }}
              >
                <Icon name={playStopText.toLowerCase()} />
                {playStopText}
              </Button>
              <Button
                onClick={this.handleConnectDisconnect}
                icon
                labelPosition="left"
                style={{ marginLeft: "1em" }}
              >
                <Icon
                  name="plug"
                  color={connectDisconnectText === "Connect" ? "green" : "red"}
                />
                {connectDisconnectText}
              </Button>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default VideoStream;

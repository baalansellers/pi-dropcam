import React from "react";
import { WSAvcPlayer } from "h264-live-player";
import { Button, Icon, Container, Placeholder } from "semantic-ui-react";

class VideoStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isConnected: false, isPlaying: false };
    this.protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
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
      this.wsavc.connect(this.protocol + "//192.168.1.87:4242/video");
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
        <canvas
          ref={canvas => (this.canvas = canvas)}
          hidden={this.state.isConnected}
        />
        <Placeholder
          style={{ height: 150, width: 150 }}
          hidden={!this.state.isConnected}
        >
          <Placeholder.Image />
        </Placeholder>
        <Container textAlign="center">
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
              color={connectDisconnectText === "Connect" ? "red" : "green"}
            />
            {connectDisconnectText}
          </Button>
        </Container>
      </div>
    );
  }
}

export default VideoStream;

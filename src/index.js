import React from 'react';
import ReactDOM from 'react-dom';
import Video from './video'; // video.js
import { connection as AyameConnection, defaultOptions } from '@open-ayame/ayame-web-sdk';
import { v4 as uuidv4 } from 'uuid';

import './index.css';

// ---- TODO -----
//  - roomID (DONE:input, url)
//  - signalingKey (DONE:input, url)
//  - codec (video, audio)
//  - DONE: button enable/disable control
//  - DONE: github actions for deploy github pages
//  - DONE: inline
//  - DONE: volume
//  - DONE: controls

// ------ params -----
const signalingUrl = 'wss://ayame-lite.shiguredo.jp/signaling';
const signalingKey = null;
let roomId = 'mm-react-ayame-test';
let clientId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
//let videoCodec = null;
//let audioCodec = null;
//let signalingKey = null;

// --- Ayame options ---
const options = defaultOptions;
options.clientId = clientId ? clientId : options.clientId;
if (signalingKey) {
  options.signalingKey = signalingKey;
}

// ------ App class ------
class App extends React.Component {
  constructor(props) {
    super(props);
    this.localStream = null;
    this.state = {
      playing: false,
      connected: false,
      gotRemoteStream: false,
      roomId: roomId,
      signalingKey: '',
    };

    // This binding is necessary to make `this` work in the callback
    this.startVideo = this.startVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);

    // -- Ayame connection --
    this.conn = null;
    this.remoteStream = null;
  }

  componentDidMount() {
    console.log('App DidMound()');
  }

  componentWillUnmount() {
    console.log('App WillUnmount()');
    if (this.localStream) {
      this.stopVideo();
    }
  }

  // -----------

  startVideo(e) {
    e.preventDefault();
    console.log('start Video');
    if (this.localStream) {
      console.warn('localVideo ALREADY started');
      return;
    }

    const constraints = { video: true, audio: true };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        this.localStream = stream;
        this.setState({ playing: true });
      })
      .catch(err => console.error('media ERROR:', err));
  }

  stopVideo(e) {
    e.preventDefault();
    console.log('stop Video');
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
      this.setState({ playing: false });
    }
  }

  // -----------------
  connect(e) {
    e.preventDefault();
    console.log('connect');

    if (this.conn) {
      console.warn('ALREADY connected');
      return;
    }

    if (this.state.signalingKey && (this.state.signalingKey !== '')) {
      options.signalingKey = this.state.signalingKey;
    }

    // (signalingUrl: string, roomId: string, options: ConnectionOptions, debug: boolean, isRelay: boolean)
    console.log('connecting roomId=%s key=%s', this.state.roomId, options.signalingKey);
    this.conn = AyameConnection(signalingUrl, this.state.roomId, options);
    this.conn.on('open', ({ authzMetadata }) => console.log('auth:', authzMetadata));
    this.conn.on('disconnect', (e) => {
      console.log('disconnected:', e);
      this.handleDisconnect();
    });
    this.conn.on('addstream', async (e) => {
      console.log(e.stream);
      this.remoteStream = e.stream;
      this.setState({ gotRemoteStream: true });
    });
    this.conn.on('removestream', async (e) => {
      console.log('removestream:', e);
      this.remoteStream = null;
      this.setState({ gotRemoteStream: false });
    });
    this.conn.connect(this.localStream)
      .then(() => {
        console.log('connected');
        this.setState({ connected: true });
      })
      .catch(err => { console.error('connect ERROR:', err) });
  }

  disconnect(e) {
    e.preventDefault();
    console.log('disconnect');
    this.handleDisconnect();
  }

  handleDisconnect() {
    if (this.conn) {
      this.conn.disconnect();
      this.conn = null;
    }

    this.remoteStream = null;
    this.setState({ connected: false, gotRemoteStream: false });
  }

  handleRoomChange(e) {
    this.setState({ roomId: e.target.value });
  }

  handleKeyChange(e) {
    this.setState({ signalingKey: e.target.value });
  }

  // -----------------
  render() {
    console.log('App render()');
    return (
      <div className="App" >
        React Ayame-Lite example<br />
        <button onClick={this.startVideo} disabled={this.state.playing || this.state.connected}> Start Video</button >
        <button onClick={this.stopVideo} disabled={!this.state.playing || this.state.connected}>Stop Video</button>
        <br />
        SignalingKey: <input id="signaling_key" type="text" value={this.state.signalingKey} onChange={this.handleKeyChange} disabled={this.state.connected}></input>
        <br />
        Room: <input id="room_id" type="text" value={this.state.roomId} onChange={this.handleRoomChange} disabled={this.state.connected}></input>
        <button onClick={this.connect} disabled={this.state.connected || !this.state.playing}> Connect</button >
        <button onClick={this.disconnect} disabled={!this.state.connected}>Disconnect</button>
        <div className="VideoContainer">
          <Video id={"local_video"} width={"160px"} height={"120px"} stream={this.localStream}>
          </Video>
          <div className="RemoteContainer">
            <Video id={"remote_video"} width={"320px"} height={"240px"} volume={0.5} controls={true} stream={this.remoteStream}>
            </Video>
          </div>
        </div>
      </div >
    );
  }
}

// ====================== ReactDOM rendering ====================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

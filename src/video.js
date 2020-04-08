import React from 'react';
import './video.css';

// ------ Video Component ------

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
  }

  componentDidMount() {
    console.log('Video DidMound(), id=%s', this.props.id);
  }

  componentWillUnmount() {
    console.log('Video WillUnmount(), id=%s', this.props.id);
  }

  render() {
    console.log('Video render(), id=%s', this.props.id);
    const stream = this.props.stream;
    if (this.elementRef.current) {
      if (this.elementRef.current.srcObject === stream) {
        console.log('same stream, so skip');
      }
      else {
        this.elementRef.current.srcObject = stream;
      }
    }
    else {
      console.log('ref.current NULL');
    }

    return (
      <video className="video_with_border" ref={this.elementRef} id={this.props.id} width={this.props.width} height={this.props.height} autoPlay muted playsinline ></video>
    );
  }
}

export default Video;

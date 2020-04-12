import React, { useRef } from 'react';
import './video.css';

// ------ Video Component ------

function Video(props) {
  const elementRef = useRef(null);

  console.log('Video rendering, id=%s', props.id);
  const stream = props.stream;
  if (elementRef.current) {
    if (elementRef.current.srcObject === stream) {
      console.log('same stream, so skip');
    }
    else {
      elementRef.current.srcObject = stream;
    }
  }
  else {
    console.log('ref.current NULL');
  }

  const controls = props.controls;
  if (controls) {
    return (
      <video className="video_with_border" ref={elementRef} id={props.id} width={props.width} height={props.height} autoPlay muted playsInline controls ></video>
    );
  }
  else {
    return (
      <video className="video_with_border" ref={elementRef} id={props.id} width={props.width} height={props.height} autoPlay muted playsInline ></video>
    );
  }
}

export default Video;

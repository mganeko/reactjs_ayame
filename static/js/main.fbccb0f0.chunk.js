(this["webpackJsonpreact-ayame"]=this["webpackJsonpreact-ayame"]||[]).push([[0],{11:function(e,t,n){e.exports=n(31)},17:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var o=n(2),a=n.n(o),i=n(3),c=n(6),s=n(7),l=n(1),r=n(9),d=n(10),u=n(0),h=n.n(u),m=n(8),g=n.n(m);n(17);var p=function(e){var t=Object(u.useRef)(null);console.log("Video rendering, id=%s",e.id);var n=e.stream,o=0;return e.volume&&(o=e.volume),t.current?(t.current.srcObject===n?console.log("same stream, so skip"):t.current.srcObject=n,t.current.volume=o):console.log("ref.current NULL"),e.controls?h.a.createElement("video",{className:"video_with_border",ref:t,id:e.id,width:e.width,height:e.height,autoPlay:!0,muted:!0,playsInline:!0,controls:!0}):h.a.createElement("video",{className:"video_with_border",ref:t,id:e.id,width:e.width,height:e.height,autoPlay:!0,muted:!0,playsInline:!0})},v=n(4),f=n(33),y=(n(30),null),b=function(){var e=window.location.search,t=new RegExp("key=([^&=]+)").exec(e),n=null;t&&(n=t[1]);return n}();b&&""!==b&&(y=b);var S="mm-react-ayame-test",E=function(){var e=window.location.search,t=new RegExp("room=([^&=]+)").exec(e),n="";t&&(n=t[1]);return n}();E&&""!==E&&(S=E);var k=Object(f.a)(),w=v.defaultOptions;w.clientId=k||w.clientId;var R=function(e){Object(d.a)(n,e);var t=Object(r.a)(n);function n(e){var o;return Object(c.a)(this,n),(o=t.call(this,e)).localStream=null,o.state={playing:!1,connected:!1,gotRemoteStream:!1,roomId:S,signalingKey:y},o.startVideo=o.startVideo.bind(Object(l.a)(o)),o.stopVideo=o.stopVideo.bind(Object(l.a)(o)),o.connect=o.connect.bind(Object(l.a)(o)),o.disconnect=o.disconnect.bind(Object(l.a)(o)),o.handleRoomChange=o.handleRoomChange.bind(Object(l.a)(o)),o.handleKeyChange=o.handleKeyChange.bind(Object(l.a)(o)),o.conn=null,o.remoteStream=null,o}return Object(s.a)(n,[{key:"componentDidMount",value:function(){console.log("App DidMound()")}},{key:"componentWillUnmount",value:function(){console.log("App WillUnmount()"),this.localStream&&this.stopVideo()}},{key:"startVideo",value:function(e){var t=this;if(e.preventDefault(),console.log("start Video"),this.localStream)console.warn("localVideo ALREADY started");else{navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((function(e){t.localStream=e,t.setState({playing:!0})})).catch((function(e){return console.error("media ERROR:",e)}))}}},{key:"stopVideo",value:function(e){e.preventDefault(),console.log("stop Video"),this.localStream&&(this.localStream.getTracks().forEach((function(e){return e.stop()})),this.localStream=null,this.setState({playing:!1}))}},{key:"connect",value:function(e){var t=this;e.preventDefault(),console.log("connect"),this.conn?console.warn("ALREADY connected"):(this.state.signalingKey&&""!==this.state.signalingKey&&(w.signalingKey=this.state.signalingKey),console.log("connecting roomId=%s key=%s",this.state.roomId,w.signalingKey),this.conn=Object(v.connection)("wss://ayame-lite.shiguredo.jp/signaling",this.state.roomId,w),this.conn.on("open",(function(e){var t=e.authzMetadata;return console.log("auth:",t)})),this.conn.on("disconnect",(function(e){console.log("disconnected:",e),t.handleDisconnect()})),this.conn.on("addstream",function(){var e=Object(i.a)(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(n.stream),t.remoteStream=n.stream,t.setState({gotRemoteStream:!0});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),this.conn.on("removestream",function(){var e=Object(i.a)(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("removestream:",n),t.remoteStream=null,t.setState({gotRemoteStream:!1});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),this.conn.connect(this.localStream).then((function(){console.log("connected"),t.setState({connected:!0})})).catch((function(e){console.error("connect ERROR:",e)})))}},{key:"disconnect",value:function(e){e.preventDefault(),console.log("disconnect"),this.handleDisconnect()}},{key:"handleDisconnect",value:function(){this.conn&&(this.conn.disconnect(),this.conn=null),this.remoteStream=null,this.setState({connected:!1,gotRemoteStream:!1})}},{key:"handleRoomChange",value:function(e){this.setState({roomId:e.target.value})}},{key:"handleKeyChange",value:function(e){this.setState({signalingKey:e.target.value})}},{key:"render",value:function(){return console.log("App render()"),h.a.createElement("div",{className:"App"},"React Ayame-Lite example",h.a.createElement("br",null),h.a.createElement("button",{onClick:this.startVideo,disabled:this.state.playing||this.state.connected}," Start Video"),h.a.createElement("button",{onClick:this.stopVideo,disabled:!this.state.playing||this.state.connected},"Stop Video"),h.a.createElement("br",null),"SignalingKey: ",h.a.createElement("input",{id:"signaling_key",type:"text",value:this.state.signalingKey,onChange:this.handleKeyChange,disabled:this.state.connected}),h.a.createElement("br",null),"Room: ",h.a.createElement("input",{id:"room_id",type:"text",value:this.state.roomId,onChange:this.handleRoomChange,disabled:this.state.connected}),h.a.createElement("button",{onClick:this.connect,disabled:this.state.connected||!this.state.playing}," Connect"),h.a.createElement("button",{onClick:this.disconnect,disabled:!this.state.connected},"Disconnect"),h.a.createElement("div",{className:"VideoContainer"},h.a.createElement(p,{id:"local_video",width:"160px",height:"120px",stream:this.localStream}),h.a.createElement("div",{className:"RemoteContainer"},h.a.createElement(p,{id:"remote_video",width:"320px",height:"240px",volume:.5,controls:!0,stream:this.remoteStream}))))}}]),n}(h.a.Component);g.a.render(h.a.createElement(R,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.fbccb0f0.chunk.js.map
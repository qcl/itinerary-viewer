//https://www.google.com.tw/maps/dir/University+of+Taipei,+Zhongzheng+District,+Taipei+City,+Taiwan/%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BF%A1%E7%BE%A9%E5%8D%80%E8%87%BA%E5%8C%97101%E8%B3%BC%E7%89%A9%E4%B8%AD%E5%BF%83/@25.0321477,121.5204559,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x3442a9a02f53dd45:0x38f05d6edd6d3845!2m2!1d121.5138046!2d25.0366038!1m5!1m1!1s0x3442abb6da80a7ad:0xacc4d11dc963103c!2m2!1d121.56481!2d25.033718
//<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>h
class AutoLinkText extends React.Component {
  render(){
    var re = /(http[s]?:\/\/[^\s]*)/g; 
    if (typeof this.props.data == "undefined"){
      return <span/>
    }
    var lines = this.props.data.split("\n")
    
    let lines_w_brs = []
    for (var id in lines){
      lines_w_brs.push(lines[id]);
      lines_w_brs.push(<br/>);
    }
    
    var text_blocks = lines_w_brs;
    //var text_blocks = this.props.data.split(" ")
    
    
    var texts = text_blocks.map(function(text, index){
      if (typeof text == "string"){
        if (text.match(re)){
          return <a href={text} target="_blank" key={index}>{text}</a>
        }
        else {
          return <span key={index}>{text + " "}</span>
        }
      }
      else {
        return <span key={index}>{text}</span>
      }
    })

    return (
      <span>{texts}</span>
    )
  }
}


/*
class Map extends React.Component {
  render(){
    var address = undefined;

    var map_img_src="http://maps.googleapis.com/maps/api/staticmap?center=" + encodeURI(address) + 
    "&size=200x200" + 
    "&markers=size:small|color:red|label:A|" + encodeURI(address)
    "&key=AIzaSyBGagqiIEihpnzPp_2xYPImM8jDryx9tlU";
    //var map_img_src="http://placehold.it/200x200";
    var external_link ="http://maps.google.com/maps?q=" + encodeURI(address);

    if ((this.props.node.type != "S" && typeof this.props.node.type !== "undefined") || typeof address == "undefined"){
      return <div/>
    }
    else {
      return (
        <div className="map">
          <a href={external_link} target="_blank">
            <img src={map_img_src}/>
          </a>
        </div>
      )
    }
  }
}

class DayMap extends React.Component {
  getInitialState(){
    return {"size": "300x300"};
  }

  handleClick(){
    // FIXME: what't the upper limit?
    this.setState({"size": "1200x1200"});
  }

  render(){
    //FIXME: ES6

    var map_img_src="https://maps.googleapis.com/maps/api/staticmap?" + 
    "&size=" + this.state['size']
    "&key=AIzaSyBGagqiIEihpnzPp_2xYPImM8jDryx9tlU";
    //var mapsrc="http://placehold.it/200x200";
    //
    this.props.nodes.map(function(node){
      //if (typeof qs['no_map'] == "undefined"){
        if (typeof node.address !== "undefined" && (node.type == "S" || typeof node.type == "undefined")){
          address = node.address;
          map_img_src += "&markers=size:small|color:red|label:A|" + encodeURI(address)  
        }
        else {
          //if (typeof node.title !== "undefined" && typeof qs['no_auto_map'] == "undefined" && (node.type == "S" || typeof node.type == "undefined")){
          //TODO:disable auto infer
          if (typeof node.title !== "undefined"){
            address = node.title;
            map_img_src += "&markers=size:small|color:red|label:A|" + encodeURI(address)  
          }
        }
      //}
    })

    //var map_img_src="http://placehold.it/200x200";
    return (
      <div className="daymap" onClick={this.handleClick}>
        <img src={map_img_src}/>
      </div>
    )
  }
}
*/

class Suggestions extends React.Component {
  render(){
    var suggestions = []
    
    
    if (this.props.node.type == "S"){
      // address = title when rendering DayMap
      if (this.props.node.type == "S" && typeof this.props.node.address !== "undefined"){
        suggestions.push(<a target="_blank" href={"https://maps.google.com/maps?q=" + encodeURI(this.props.node.address)}>map</a>)
      }
      suggestions.push(<span> | </span>)

      suggestions.push(<a target="_blank" href={"https://www.google.com/search?q=" + encodeURI(this.props.node.title)}>detail</a>)
      suggestions.push(<span> | </span>)
      suggestions.push(<a target="_blank" href={"https://www.google.com/search?q=" + encodeURI(this.props.node.title) + "+address"}>address</a>)
      suggestions.push(<span> | </span>)
      suggestions.push(<a target="_blank" href={"https://www.google.com/search?q=" + encodeURI("restaurant near " + this.props.node.title)}>food</a>)
      suggestions.push(<span> | </span>)
      suggestions.push(<a target="_blank" href={"https://www.google.com/search?q=" + encodeURI("things to do near " + this.props.node.title)}>sights</a>)
    }
    return (
      <div className="suggestions">
        {suggestions}
      </div>
    )
  }

}

class Node extends React.Component {
  render(){
    var node = this.props.node;
    var desc = <AutoLinkText data={node.description}/>
    var sg_route_class="";
    if (node.type == "SG-route"){
      return (
        <div className="node suggestions" >
          <div className="content">
            <a href={node.description} target="_blank">direction?</a>
          </div>
        </div>
      );
    }

    var suggestions;
    if (typeof this.props.config['planningMode'] !== "undefined"){
      suggestions = (<Suggestions node={node}/>)
    }
    //var map = <Map node={node}/>
    var map = [];
    var time = [];
    if (typeof node.time !== "undefined" && node.time !== ""){
        time = <p className="time"><i className="fa fa-clock-o"/>{node.time}</p>
    }

    var address = [];
    if (node.address !== node.title){
      address = <p className="address"><i className="fa fa-map-marker"/>{node.address}</p>
    }

    var titleNode = <h4 className="title">{node.title}</h4>
    if (node.type == "T"){
      titleNode = <p className="title">{node.title}</p> 
    }
    else if (node.type == "D"){
      var year = (new Date()).getFullYear()
      var mmdd = node.title.split('/')
      var date = new Date(year, mmdd[0]-1, mmdd[1])
      var dayString = ""
      switch (date.getDay()) {
        case 0:
          dayString = "日"
          break;
        case 1:
          dayString = "一"
          break;
        case 2:
          dayString = "二"
          break;
        case 3:
          dayString = "三"
          break;
        case 4:
          dayString = "四"
          break;
        case 5:
          dayString = "五"
          break;
        case 6:
          dayString = "六"
          break;
        default:
          dayString = ""
          break;
      }

      if (dayString == ""){
        titleNode = <h2 className="title">{node.title}</h2>
      }
      else {
        titleNode = <h2 className="title">{node.title + " (" + dayString + ")"}</h2>

      }

    }
    return (
      <div className={"node " + sg_route_class + " " + this.props.node.type} >
        <div className="content">
          {titleNode}
          {map}
          <div className="text">
            {time}
            {address}
            <p className="description">{desc}</p>
            {suggestions}
          </div>
        </div>
      </div>
    );

    //return <p> placeholder</p>
  }
}

class Day extends React.Component {
  fillEmptyTypes(nodes){
    return nodes.map(function(node){ 
      if (typeof node['type'] == "undefined") {
        node['type'] = "S";
      }
      if (typeof node['address'] == "undefined") {
        node['address'] = node['title'];
      }
      return node
    });
  }
  inferAddress(nodes){
    return nodes.map(function(node){
      if (node['type'] !== "S"){
        return node;
      }
      if (typeof node['address'] == "undefined"){
        node['address'] = node['title'];
        return node
      }
    })
  }
  insertTransitSuggestions(nodes){
    function createSGNode(from, to) {
      return {
            "type": "SG-route",
            "title":"Find route",
            "address":"Find route",
            "description":"http://maps.google.com/maps?saddr=" + encodeURI(from) + "&daddr=" + encodeURI(to) + "&dirflg=r"
      }
    }
    for (var idx =0; idx < nodes.length-1; idx++){
      if (nodes[idx]['type'] == "S" && nodes[idx+1]['type'] == "S") {
        nodes.splice(idx+1, 0, createSGNode(nodes[idx]['address'], nodes[idx+1]['address']))
      }
    }
    for (var idx =0; idx < nodes.length-2; idx++){
      if (nodes[idx]['type'] == "S" && nodes[idx+1]['type'] == "T" && nodes[idx+2]['type'] == "S") {
        nodes.splice(idx+1, 0, createSGNode(nodes[idx]['address'], nodes[idx+2]['address']))
      }
    }
    return nodes;
  }
  inferTitleAndType(nodes){
    return nodes.map(function(node){
      
      if (!node.hasOwnProperty('title')){
        if (node.hasOwnProperty('sight')){
          node['title'] = node['sight'];
          node['type'] = 'S';
        }
        if (node.hasOwnProperty('transit')){
          node['title'] = node['transit'];
          node['type'] = 'T';
        }
        if (node.hasOwnProperty('note')){
          node['title'] = node['note'];
          node['type'] = 'N';
        }
      }
      return node;
    });
  }
  render(){
    // Creating the date title node
    var rawnodes = [{title: this.props.date, type:"D"}]
    rawnodes = rawnodes.concat(JSON.parse(JSON.stringify(this.props.nodes))); // Copy here to avoid modifying the props

    var nodes = this.inferTitleAndType(rawnodes);
    nodes = this.fillEmptyTypes(nodes);
    
    if(typeof this.props.config['planningMode'] !== "undefined" && this.props.config['planningMode'][0] == "1"){ //BUG: python server will be "1/"
      nodes = this.insertTransitSuggestions(nodes);
    }
    
    
    var config = this.props.config;
    
    nodes = nodes.map(function(node, index, array){
      return (
        <Node key={index} node={node} config={config} drawVertLine={(index != array.length-1)}  />
      )
    }) 
    return (
      <div className={"timeline " + this.props.no}>
        {nodes}
      </div>
    );
  }
}

class Days extends React.Component {
  render(){
    
    var days = [];
    var grey = false;
    if (this.props.days === undefined) {
      return;
    }
    else if (Array.isArray(this.props.days)) {
      // v2
      for (let [idx, day] of this.props.days.entries()){
        let nodes = (day.itinerary === null) ? [{"title": "No plan for today", "type": "N"}] : day.itinerary;
        days.push(
          <div key={idx}>
            <Day no={grey ? 'grey': ''} nodes={nodes} date={day.date} config={this.props.config}/>
            {/*<DayMap nodes={this.props.days[date]}/>*/}
          </div>
        )
        grey = !grey
      }
    }
    else {
      // v1, the top level is an object (hashmap)
      for (var date in this.props.days){
        days.push(
          <div key={date}>
            {<Day no={grey ? 'grey': ''} nodes={this.props.days[date]} date={date} config={this.props.config}/>}
            {/*<DayMap nodes={this.props.days[date]}/>*/}
          </div>
        )
        grey = !grey
      }
    }

    return (
      <div className="container">
      {days}
      </div>
    )
  }
}


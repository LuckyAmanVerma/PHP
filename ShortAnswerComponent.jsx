import React from 'react';
import {Input} from 'antd';
export default class ShortAnswerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            value:""
         }
    }
componentDidMount(){
        if(!Object.keys(this.props.data).length)
        this.props.setAllData(this.state);
    }
    componentDidUpdate(){
        if(!Object.keys(this.props.data).length)
        this.props.setAllData(this.state);
      }
    render() { 
        return (<>
         <Input placeholder="Short Answer" className="short-answer-input" defaultValue={this.props.data.value} onChange={(e)=>{this.props.setData('value',e.target.value)}} allowClear  readOnly={!this.props.viewMode} />
         </>
);
    }
}
 

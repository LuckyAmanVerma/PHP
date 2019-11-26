import React from 'react';
import {Input} from 'antd';
const { TextArea } = Input;
export default class  LongAnswerComponent extends React.Component {
    state = {
        value:""
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
        
        return (  
        <TextArea className="input-field-design" rows={4} placeholder="Long Answer"  defaultValue={this.props.data.value} onChange={(e)=>{this.props.setData('value',e.target.value)}} allowClear  readOnly={!this.props.viewMode}/>
        );
    }
}
 

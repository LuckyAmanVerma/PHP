import React from 'react';
import { Input, Radio, Button, Icon, Switch, Checkbox, Row, Col } from 'antd';
export default class RadioButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          value:"0", 
           options:{0:"",1:""}
         }
    }
    addRadio=(e)=>{
        
        let value = Object.keys(this.state.options)[Object.keys(this.state.options).length - 1]
        this.setState({ options: { ...this.state.options, [Number(value) + 1]: "" } },()=>{
            this.props.setData('options',this.state.options)  
        })  
    }
    
    changeRadio=(e,key)=>{
      
      this.setState({ value:Object.values(this.state.options)[0],options: { ...this.state.options, [key]: e.target.value } },()=>{
        this.props.setData('options',this.state.options)
        // this.props.setData('value',this.state.value)
            
        })

      }
    onChange = e => {
     
        this.setState({
          value: e.target.value
        },()=>{

          this.props.setData('value',e.target.value)    
        });
      }
      editChange = e => {
        this.setState({
          value: e.target.value
        },()=>{
          this.props.setData('value',e.target.value)    
        });
      }
      componentDidMount() {
        if (!Object.keys(this.props.data).length)
            this.props.setAllData(this.state);
    }
    componentDidUpdate() {
        
        if (!Object.keys(this.props.data).length)
            this.props.setAllData(this.state);
    }
    render() { 
     
        return ( <>
      
         <div>
          { this.props.data.options? this.props.viewMode?<>
            <Radio.Group  onChange={this.onChange}  style={{marginLeft:10}} defaultValue={this.props.data.value} >
            {Object.keys(this.props.data.options).map((item, key) => { if(item!=="") return <Radio value={this.props.data.options[item]} key={key} > <Input 
      style={{width:200,border:"none"}}
        contentEditable 
        readOnly={this.props.viewMode}
        value={this.props.data.options[item]}
       /> </Radio>  })}
              </Radio.Group>
          </>:<>
          <Radio.Group  onChange={this.editChange} defaultvalue={this.props.data.value}>
         {
                    Object.keys(this.props.data.options).map((item,key)=>{
                        return <Radio key={key} value={this.props.data.options[item]}>
                            <Input 
                            className="theInputRadio" 
                            style={{width:200,border:"none"}}
                            placeholder={`Value ${key}`}
                            contentEditable
                          readOnly={this.props.viewMode}
                          defaultValue={this.props.data.options[item]}
                          onChange={(e)=>this.changeRadio(e,item)}
                            />
                        </Radio>
                        })
                }
            </Radio.Group>
            <Icon type="arrow-down" style={{fontSize:23,position:"relative",right:10}}  onClick={(e)=>this.addRadio(e)} />
          </>:null
          }
      </div>


    </>);
  }
}


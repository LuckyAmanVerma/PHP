import React from 'react';
import { Checkbox, Input, Icon, Row, Col, Button } from 'antd';
export default class CheckBoxComponent extends React.Component {
   state = {
      options:{0:"",1:""},
      value:[]
 
}
    addCheck=(e)=>{
      let value = Object.keys(this.state.options)[Object.keys(this.state.options).length - 1]
      this.setState({ options: { ...this.state.options, [Number(value)+1]: "" } },()=>{
          this.props.setData('options',this.state.options)  
      })  
  }
  
  changeCheck=(e,key)=>{
   this.setState({ options: { ...this.state.options, [key]: e.target.value } },()=>{
      this.props.setData('options',this.state.options)    
      })
   }
    componentDidMount(){
      if(!Object.keys(this.props.data).length)
      this.props.setAllData(this.state);
  }
  componentDidUpdate() {
        
        if (!Object.keys(this.props.data).length)
            this.props.setAllData(this.state);
    }
    onChange=(checkedValues)=>{
this.setState({value:checkedValues},()=>{  this.props.setData('value',checkedValues)      })
    }
  render() {
    return (
      <>
        {this.props.data.options ?
          this.props.viewMode ? <>
            <Row>
              <Checkbox.Group style={{ width: '100%',marginLeft:'12px' }} onChange={this.onChange} defaultValue={this.props.data.value}   >
                {Object.keys(this.props.data.options).map((item, key) => {
                  if (item !== "") return <Checkbox value={this.props.data.options[item]}><Input
                    style={{ width: 200, border: "none" }}
                    contentEditable
                    readOnly={this.props.viewMode}
                    value={this.props.data.options[item]}
                  /> </Checkbox>
                })}
              </Checkbox.Group>
            </Row>
          </> : <>
          <div className="checkbox-container">
            <Checkbox.Group  onChange={this.onChange} defaultValue={this.props.data.value} >
                {
                  Object.keys(this.props.data.options).map((item, key) => {
                    return <Checkbox key={key} value={this.props.data.options[item]}>
                      <Input
                        className="input-field-design"
                        style={{ width: 200}}
                        placeholder={`Value ${key}`}
                        contentEditable
                        readOnly={this.props.viewMode}
                        defaultValue={this.props.data.options[item]}
                        onChange={(e) => this.changeCheck(e, key)}
                      />
                        </Checkbox>
                  })
                }
               </Checkbox.Group>
                 <div onClick={(e) => this.addCheck(e)} className="add-more-checkbox-btn">Add Option</div>
                
              </div>
            </> : null
        }
      </>
    );
  }
}


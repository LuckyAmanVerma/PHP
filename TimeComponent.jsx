import React, { Component } from 'react'
import { TimePicker,Row,Col } from 'antd';
import moment from "moment";

export default class TimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"",
            type:"Time",
            value:"",
            format:"HH:mm:ss"
        }          
      
    }
    onChange=(time,timeString)=>{
      //  let timeNow = moment(timeString, 'HH:mm:ss')
        this.props.setData('value',timeString)
    }
    componentDidUpdate(){
        if(!Object.keys(this.props.data).length)
        this.props.setAllData(this.state);         
      }
      
    render(){      
        return(
            <div style={{marginTop:'10px'}}>
                {!this.props.viewMode?(<Row>
                    <Col span={24}>        
                        <Col span={6}>Choose Time</Col>
                        <Col span={18}>
                            <TimePicker onChange={this.onChange} defaultValue={!this.props.data.value?moment('00:00:00', this.state.format):moment(this.props.data.value,this.state.format)} format={this.state.format} />
                        </Col>
                    </Col> 
                </Row>):null}              
            </div>
        )
    }
}
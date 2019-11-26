import React, { Component } from 'react'
import { Rate, Row, Col, List, Select ,Input} from 'antd';
//const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { Option } = Select;
const maxValues = [];

export default class RateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Rating",
      count: 11,
      value: 0,
      scaleMin: 0,
      scaleMax: 10,
      rateValues: []
    }
  }
  rateChange = (e) => {
    this.props.setData('value', e.target.value)
    //this.setState({ value:Number(e.target.value) });
  };
  handleChange = (e) => {
    this.props.setData('value', e)
    //this.setState({ value:e });
  }
  handleRateCount = (min, max) => {
    let rateValues = []
    for (var i = min; i <= max; i++) {
      rateValues.push(i);
    }

    return rateValues;
  }
  handleMinChange = (e) => {

    this.props.setMultipleData({ 'scaleMin': Number(e.target.value), 'count': this.props.data.scaleMax + 1 - Number(e.target.value) });


  }
  handleMaxChange = (e) => {

    this.props.setMultipleData({ 'scaleMax': Number(e.target.value), 'count': Number(e.target.value) + 1 - this.props.data.scaleMin });

  }
  componentDidMount() {
    if (!Object.keys(this.props.data).length)
      this.props.setAllData(this.state);

  }
  componentDidUpdate() {
    if (!Object.keys(this.props.data).length) {
      this.props.setAllData(this.state);

    }
  }
  render() {
    const { value } = this.state;
    return (
      <div className="file-rating">
        {!this.props.viewMode ? (
          <div>
            <Row>
              <Col className="file-rating-col" span={9}>
                <Col span={4} >Min</Col>
                <Col span={5}>
                                 <Input size="small" style={{ width: '100%' }} value={this.props.data.scaleMin} placeholder="Select Min" onChange={this.handleMinChange} />
                </Col>
              </Col>
            </Row>
            <Row>
              <Col className="file-rating-col" span={9}>
                <Col span={4}>Max</Col>
                <Col span={5}>
               <Input size="small" style={{ width: '100%' }} value={this.props.data.scaleMax} placeholder="Select Max" onChange={this.handleMaxChange} />
              </Col>
              </Col>
            </Row>
          </div>) : null}

        {this.props.viewMode ? (
          <Row>
            <Col span={24}>
              <List
                    dataSource={this.handleRateCount(this.props.data.scaleMin, this.props.data.scaleMax)}
                    renderItem={(index) => (
                      <List.Item style={{ float: 'left', marginLeft: '6px', marginRight: '14px', borderBottom: '0', fontWeight: '800' }}>
                        {index}
                      </List.Item>
                    )}
                  />
            </Col>
            <Col span={24}>
              <span>
                <Rate
                  count={this.props.data.count}
                  onChange={this.handleChange}
                  value={this.props.data.value}
                />
               
              </span>
            </Col>
          </Row>) : null}
      </div>
    );
  }
}

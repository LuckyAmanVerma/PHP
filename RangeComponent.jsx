import React, { Component } from 'react'
import { Slider, Col, Row, Input, Radio, Button } from 'antd';
export default class RangeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "Range",
            min: 0,
            max: 100,
            marks: {},
            value: 0,
            range: '0,1',
            rangeValue: [],
            typeOfSlide: "single",
            step: 1

        }
    }

    minChange = (e) => {
        this.props.setData('min', Number(e.target.value));
        //this.setState({min:Number(e.target.value)});
    }
    maxChange = (e) => {
        this.props.setData('max', Number(e.target.value));
        //this.setState({max:Number(e.target.value)});      
    }
    sliderTypehange = (e) => {
        this.props.setData('typeOfSlide', e.target.value)
        //this.setState({typeOfSlide:e.target.value});
    }
    valueChange = (e) => {
        this.props.setData('value', e.target.value)
        //this.setState({value:e.target.value});
    }
    sliderValueChange = (e) => {
        this.props.setData('value', e)
    }
    sliderRangeChange = (e) => {

        this.props.setData('rangeValue', e)

    }
    stepChange = (e) => {
        this.props.setData('step', e.target.value)
        //this.setState({step:e.target.value});
    }
    rangeChange = (e) => {

        let range = e.target.value.split(','), rangeValue = [Number(range[0]), Number(range[1])];

        this.props.setMultipleData({ range: e.target.value, rangeValue })


    }
    componentDidMount() {
        if (!Object.keys(this.props.data).length)
            this.props.setAllData(this.state);
    }
    render() {
        let marks = {
            [this.props.data.min]: 'low',
            [this.props.data.max]: 'high',
            [this.props.data.max]: {
                style: {
                    color: '#f50',
                },
                label: <strong>high</strong>,
            },
        };
        const typeOfSlide = this.props.data.typeOfSlide
        return (
            <div style={{ padding: '12px' }}>
              
  {!this.props.viewMode ? (
                    <Row className="form-builder-range">

                        <div>
                            <Input className="form-builder-range-input input-field-design " size="small" placeholder="Min" defaultValue={this.props.data.min} onInput={this.minChange} />
                        </div>
                        <span className="range-to-txt" >to</span>
                        <div>
                            <Input className="form-builder-range-input input-field-design " size="small" placeholder="Max" defaultValue={this.props.data.max} onInput={this.maxChange} />
                        </div>

                    </Row>) : null}

                {!this.props.viewMode ? (<Row style={{ marginTop: "15px" }}>

                    <label className="slider-lable">Slider Type</label>

                    <Radio.Group className="select-range-type" onChange={this.sliderTypehange} defaultValue={this.props.data.typeOfSlide}>
                        <Radio value="single">Single</Radio>
                        <Radio value="range">Range</Radio>
                    </Radio.Group>
                </Row>) : null}

                {!this.props.viewMode ? (
                    <Row className="form-builder-enter-value">
                        {typeOfSlide == "single" ? (
                            <div className="form-builder-value">
                                <label>Enter Value</label>
                                <Input className="form-builder-range-input" size="small" disabled={this.props.viewMode} placeholder="Value" value={this.props.data.value} onInput={this.valueChange} />
                            </div>) : (
                                <div className="form-builder-value">
                                    <label>Enter Range(Comma Seprated)</label>
                                    <Input className="form-builder-range-input" size="small" disabled={this.props.viewMode} placeholder="Range" value={this.props.data.range} onInput={this.rangeChange} />
                                </div>
                            )}
                        <div className="form-builder-value">
                            <label>Enter Step</label>
                            <Input className="form-builder-range-input" size="small" disabled={this.props.viewMode} placeholder="Step" defaultValue={this.props.data.step} onInput={this.stepChange} />
                        </div>

                    </Row>) : null}




                  <Row style={{ marginTop: "10px" }}>
                    {typeOfSlide == "single" ? (
                        !this.props.viewMode ? (
                            <Slider marks={marks} step={this.props.data.step} min={this.props.data.min} max={this.props.data.max} value={this.props.data.value || 0} />) :
                            (<Slider marks={marks} step={this.props.data.step} min={this.props.data.min} max={this.props.data.max} onChange={this.sliderValueChange} defaultValue={this.props.data.value} />)
                    ) : (
                            !this.props.viewMode ? (
                                <Slider marks={marks} step={this.props.data.step} min={this.props.data.min} max={this.props.data.max} range value={this.props.data.rangeValue ? [...this.props.data.rangeValue] : [this.props.data.min, this.props.data.max]} />) :
                                (<Slider marks={marks} step={this.props.data.step} min={this.props.data.min} max={this.props.data.max} range onChange={this.sliderRangeChange}
                                    defaultValue={this.props.data.rangeValue ? [...this.props.data.rangeValue] : [this.props.data.min, this.props.data.max]} />)
                        )}
                </Row>
            </div>
        )
    }
}

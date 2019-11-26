import React, { Component } from 'react'
import { Col, Row, Icon, Menu, Dropdown, Checkbox, Switch, Input, Radio, Tooltip, Button, Select } from 'antd';
import DateComponent from './DateComponent';
import RangeComponent from './RangeComponent';
import FileUploadComponent from './FileUploadComponent'
import RateComponent from './RateComponent';
import ShortAnswerComponent from './ShortAnswerComponent';
import LongAnswerComponent from './LongAnswerComponent';
import CheckBoxComponent from './CheckBoxComponent'
import SelectComponent from './SelectComponent'
import RadioButtonComponent from './RadioButtonComponent'
import TimeComponent from './TimeComponent'
const { TextArea } = Input;
const { Option } = Select;
export default class SwitchAlltComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.data && props.data.type ? props.data.type : "shortanswer",
            position: {},
            childData: props.data || {},
            containerProperties: {},
            isMandatory: props.data && props.data.isMandatory ? true : false,
        
            isDescription: props.data && props.data.isDescription ? true : false,
            isNote: props.data && props.data.isNote ? true : false,
            changeTypeList: [
                {
                    name: 'Date',
                    type: "date"
                },
                {
                    name: 'Time',
                    type: "time"
                },
                {
                    name: 'Range',
                    type: "range"
                },
                {
                    name: 'FileUpload',
                    type: "fileupload"
                },
                {
                    name: 'Rating',
                    type: "rating"
                },
                {
                    name: "Short Answer",
                    type: "shortanswer"
                },
                {
                    name: "Long Answer",
                    type: "longanswer"
                },
                {
                    name: "Checkbox",
                    type: "checkbox"
                },
                {
                    name: "Select",
                    type: "select"
                }, {
                    name: "Radio",
                    type: "radio"
                }

            ],
            advanceOptionList: [
                {
                    name: 'Description',
                    key: 'isDescription',
                    event: (e) => {
                        this.changeCheckBox('isDescription', e.target.checked)
                    }
                },
                {
                    name: 'Note',
                    key: 'isNote',
                    event: (e) => {
                        this.changeCheckBox('isNote', e.target.checked)


                    }
                }
            ]
        }

    }
    onChangeType = (e) => {
        this.setState({ type: e, childData: {} }, () => {
            this.props.setData({}, this.props.index)
        })
    }
    changeCheckBox(variableName, value) {
        this.setState({ childData: { ...this.state.childData, [variableName]: value }, [variableName]: value }, () => {
            this.props.setData(this.state.childData, this.props.index)
        });
    }
    setData = (variableName, value) => {
        this.setState({ childData: { ...this.state.childData, [variableName]: value } }, () => {
            this.props.setData(this.state.childData, this.props.index)
        })
    }
    setMultipleData = (obj) => {
        //this.props.setData(variableName,value)
        this.setState({ childData: { ...this.state.childData, ...obj } }, () => {
            this.props.setData(this.state.childData, this.props.index)
        })
    }
    setAllData = (state) => {
        this.setState({ childData: { ...state, type: this.state.type }, }, () => this.props.setData(this.state.childData, this.props.index))

    }
    remove = () => {
        this.props.remove(this.props.index)
    }

    switchComponent = (type) => {
        switch (type) {
            case "date": return <DateComponent setAllData={this.setAllData} setData={this.setData} data={this.state.childData}
                viewMode={this.props.viewMode} />;
            case "time": return <TimeComponent setAllData={this.setAllData} setData={this.setData} data={this.state.childData}
                viewMode={this.props.viewMode} />;
            case "range": return <RangeComponent setMultipleData={this.setMultipleData} setAllData={this.setAllData} setData={this.setData} data={this.state.childData}
                viewMode={this.props.viewMode} />;
            case "fileupload": return <FileUploadComponent setAllData={this.setAllData} setMultipleData={this.setMultipleData} setData={this.setData} data={this.state.childData}
                viewMode={this.props.viewMode} />;
            case "rating": return <RateComponent setMultipleData={this.setMultipleData} setAllData={this.setAllData} setData={this.setData} data={this.state.childData}
                viewMode={this.props.viewMode} />;
            case "longanswer": return <LongAnswerComponent setAllData={this.setAllData} setData={this.setData} data={this.state.childData} viewMode={this.props.viewMode} />;
            case "checkbox": return <CheckBoxComponent setAllData={this.setAllData} setData={this.setData} data={this.state.childData} viewMode={this.props.viewMode} />;
            case "select": return <SelectComponent setAllData={this.setAllData} setData={this.setData} data={this.state.childData} viewMode={this.props.viewMode} />;
            case "radio": return <RadioButtonComponent setAllData={this.setAllData} setData={this.setData} data={this.state.childData} viewMode={this.props.viewMode} />;

            default: return <ShortAnswerComponent setAllData={this.setAllData} setData={this.setData} data={this.state.childData} viewMode={this.props.viewMode} />;
        }
    }

    render() {
        let changeTypeList, changeTypeListMenu, menuInside, menu;
        if (!this.props.viewMode) {

            changeTypeList = this.state.changeTypeList.map((itm, i) => {


                return <Option value={itm.type} >{itm.name}</Option>



            })


            menuInside = []
            this.state.advanceOptionList.map((itm, i) => {
                menuInside.push(
                    <Menu.Item key={itm.name}>
                        <Checkbox key={itm.key} defaultChecked={this.state[itm.key] ? true : false} onChange={itm.event}>{itm.name}</Checkbox>
                    </Menu.Item>
                )
                return {}
            })               //this.state.checked.push(false);


            menu = (<Menu>
                {menuInside}
            </Menu>)
        }


        let data = { ...this.state.childData };
        return (
            <div>
                <div className="subParentBox">
                    <div className="form-question-option">
                        {!this.props.viewMode ? (
                            <Radio.Group >
                                <Tooltip title="Select this to add question description"><Checkbox onChange={(e) => { this.changeCheckBox('isDescription', e.target.checked) }}>Add Description</Checkbox></Tooltip>
                                <Tooltip title="Select this to show note for some specific question"> <Checkbox onChange={(e) => { this.changeCheckBox('isNote', e.target.checked) }}>Add Note</Checkbox></Tooltip>
                            </Radio.Group>

                        ) : null}
                    </div>
                    <div className="form-question-title">
                        {!this.props.viewMode ? (
                            <span className="question-input-block">
                                <Input className="form-builder-ques-title input-field-design" defaultValue={data.title} onChange={(e) => { this.setData('title', e.target.value) }} placeholder="Title" />
                            </span>
                        ) :
                            (<label className="ml-12 lableTitle">{data.title}</label>)}
                        {!this.props.viewMode ? (

                            <Select className="select-component-btn" defaultValue={this.state.type} onChange={(e) => this.onChangeType(e)}>
                                {changeTypeList}
                            </Select>

                        ) : null}
                    </div>
                    <div>
                        {this.state.isDescription ?
                            (<div>
                                {!this.props.viewMode ? (<TextArea className="input-field-design form-add-ques-description" defaultValue={data.description} onChange={(e) => { this.setData('description', e.target.value) }} placeholder="Description" disabled={this.props.viewMode} />) :
                                    (<label className="ml-12 lableDescription">{data.description}</label>)}
                            </div>) : null}
                    </div>

                    <div className="component-switch-div" >{this.switchComponent(this.state.type)}</div>

                    <div style={{ marginBottom: '10px' }}>
                        <Row>
                            <Col span={24}>

                                {this.state.isNote ? (<Col span={24}>
                                    {!this.props.viewMode ? (<Input className="input-field-design form-add-ques-description" defaultValue={data.note} onChange={(e) => { this.setData('note', e.target.value) }} placeholder="Note" disabled={this.props.viewMode} />) :
                                        (<label className="ml-12 lableDescription">{data.note}</label>)}
                                </Col>) : null}
                            </Col>
                        </Row>
                    </div>
                    <Row className="form-builder-question-bottom">
                        {!this.props.viewMode ? (
                            <span className="delete-icon">
                                <Tooltip title="Click to delete question"><Icon type="delete" onClick={this.remove} /></Tooltip>
                            </span>) : null}

                        {!this.props.viewMode ? (

                            <span className="form-ques-controls">
                                <span style={{ marginLeft: "10px" }}>Primary
                             <Switch style={{ marginLeft: "10px" }} checked={this.props.primaryfeild == this.props.index} onChange={(i, e) => { this.props.setPrimary(this.props.index) }} />
                                </span>
                                <span style={{ marginLeft: "10px" }}>Mandotory

                    <Switch style={{ marginLeft: "10px" }} defaultChecked={this.state.isMandatory} onChange={(i, e) => { this.changeCheckBox('isMandatory', i) }} />
                                </span>
                            </span>) : null}

                    </Row>

                </div>
            </div>
        )
    }
}

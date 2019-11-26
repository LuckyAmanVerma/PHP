import React, { Component } from 'react'
import { Col, Row, Select, Input, DatePicker, Button } from 'antd';
import moment from "moment";
const { Option } = Select;

export default class DateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "DateTime",
            value: "",
            startDate: null,
            endDate: null,
            defaultDate: {
                min: "",
                max: ""
            },
            defaultDateValue: null,
            formatValue: null,
            validation: {

            }
        }
        this.disabledDate = this.disabledDate.bind(this);
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this);

    }
    startDateChange(dateString) {
        this.props.setData('startDate', moment(dateString).format('YYYY-MM-DDTHH:MM:ssZ'))
    }
    endDateChange(dateString) {
        this.props.setData('endDate', moment(dateString).format('YYYY-MM-DDTHH:MM:ssZ'))
    }
    DateChange = (dateString) => {
        this.props.setData('value', moment(dateString).format('YYYY-MM-DDTHH:MM:ssZ'))
        //moment.utc().format('YYYY-MM-DDTHH:MM:ssZTHH:MM:ssZ')
    }
    disabledDate(current) {
        if (this.props.data.startDate == "Invalid date" && this.props.data.endDate == "Invalid date") {
            return false;
        }
        if (this.props.data.endDate == null || this.props.data.endDate == "Invalid date") {
            return moment(current).format('YYYY-MM-DDTHH:MM:ssZ') < this.props.data.startDate;
        }
        else if (this.props.data.startDate == null || this.props.data.startDate == "Invalid date") {
            return moment(current).format('YYYY-MM-DDTHH:MM:ssZ') > this.props.data.endDate;
        } else {
            var currentDate = moment(current).format('YYYY-MM-DDTHH:MM:ssZ');
            var datestart = currentDate < this.props.data.startDate;
            var dateend = currentDate > this.props.data.endDate;
            return datestart || dateend;
        }
    }
    startDateValidation = (current) => {
        if (this.props.data.endDate == null || this.props.data.endDate == "Invalid date") {
            return false;
        }
        else return moment(current).format('YYYY-MM-DDTHH:MM:ssZ') > this.props.data.endDate;
    }
    endDateValidation = (current) => {
        if (this.props.data.startDate == null || this.props.data.startDate == "Invalid date") {
            return false;
        }
        else return moment(current).format('YYYY-MM-DDTHH:MM:ssZ') < this.props.data.startDate;
    }
    DefaultDateChange = (e) => {
        this.props.setData('defaultDateValue', moment(e).format('YYYY-MM-DDTHH:MM:ssZ'))
    }
    handleFormatChange(e) {
        this.props.setData('formatValue', e)
        //this.setState({formatValue:e});
    }
    handleToUpdatePrimary(someArg) {
        this.setState({ isPrimary: someArg });
    }
    handleToUpdateMendotory(someArg) {
        this.setState({ isMandatory: someArg });
    }
    titleChange = (e) => {
        this.props.setData('title', e.target.value);
    }
    componentDidMount() {
        if (!Object.keys(this.props.data).length)
            this.props.setAllData(this.state);
        // var date = moment(new Date()).format('YYYY-MM-DDTHH:MM:ssZ');
        // this.props.setData('startDate',date);
    }
    componentDidUpdate() {
        if (!Object.keys(this.props.data).length)
            this.props.setAllData(this.state);
    }

    render() {
        const exType = ['YYYY-MM-DDTHH:MM:ssZ', 'DD/MM/YYYY', 'YYYY/MM/DD', 'MM/DD/YY', 'YY/MM/DD', 'DD/MM/YY', 'DDMMYY', 'D/M/YY'];

        const children = [];
        for (let i = 0; i < exType.length; i++) {
            children.push(<Option key={exType[i]}>{exType[i]}</Option>);
        }

        return (
            <div style={{ padding: '12px' }}>
                {!this.props.viewMode ? (<Row>
                    <Col span={5}>
                        <div>Choose Format</div>
                        <span>
                            <Select size="small" className="select-date-format" defaultValue={this.props.data.formatValue}  placeholder="Select Format" onChange={this.handleFormatChange}>
                                {children}
                            </Select>
                        </span>
                    </Col>
                </Row>) : null}
                {!this.props.viewMode ? (<Row style={{ marginTop: '20px' }}>
                    <Col span={8}>
                        <div>Start Date</div>
                        <span><DatePicker format={this.props.data.formatValue} onChange={this.startDateChange} value={!this.props.data.startDate || this.props.data.startDate == 'Invalid date' ? null : moment(this.props.data.startDate, 'YYYY-MM-DDTHH:MM:ssZ')} disabledDate={this.startDateValidation} /> </span>
                    </Col>
                    <Col span={8}>
                        <div>End Date</div>
                        <span><DatePicker format={this.props.data.formatValue} onChange={this.endDateChange} defaultValue={!this.props.data.startDate || this.props.data.startDate == 'Invalid date' ? null : moment(this.props.data.endDate, 'YYYY-MM-DDTHH:MM:ssZ')} disabledDate={this.endDateValidation} /></span>
                    </Col>
                    <Col span={8}>
                        <div>Default Date</div>
                        <span span={16}><DatePicker format={this.props.data.formatValue} defaultPickerValue={moment(this.props.data.startDate, 'YYYY-MM-DDTHH:MM:ssZ')} onChange={this.DefaultDateChange} disabledDate={this.disabledDate}
                            defaultValue={this.props.data.startDate ? moment(this.props.data.defaultDateValue, 'YYYY-MM-DDTHH:MM:ssZ') : null} /></span>
                    </Col>
                </Row>) : null}
                <Row style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <DatePicker format={this.props.data.formatValue} disabled={!this.props.viewMode} defaultPickerValue={moment(this.props.data.defaultDateValue, 'YYYY-MM-DDTHH:MM:ssZ')} disabledDate={this.disabledDate} onChange={this.DateChange} />
                    </Col>
                </Row>
            </div>
        )
    }
}
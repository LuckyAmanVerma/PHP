import React from 'react';
import { Input, Icon, Select, Checkbox, Radio } from 'antd';
export default class SelectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: { 0: "", 1: "" }, isMulti: false,
            value: []
        }
    }
    changeCheck = (e, key) => {
        this.setState({ options: { ...this.state.options, [key]: e.target.value } }, () => {
            this.props.setData('options', this.state.options)
        })
    }
    changeRadio = (e, key) => {
        this.setState({ value: Object.values(this.state.options)[0], options: { ...this.state.options, [key]: e.target.value } }, () => {
            this.props.setData('options', this.state.options)
            // this.props.setData('value',this.state.value)
        })
    }
    handleChange = (e) => {
        debugger;
        this.setState({ value: e }, () => {
            this.props.setData('value', this.state.value)

        })
    }
    onChange = (e) => {

        this.setState({
            isMulti: e.target.checked
        }, () => {
            this.props.setData('isMulti', this.state.isMulti)
        })
    }
    addSelect = (e) => {
        let value = Object.keys(this.state.options)[Object.keys(this.state.options).length - 1]
        this.setState({ options: { ...this.state.options, [Number(value) + 1]: "" } }
            , () => {
                this.props.setData('options', this.state.options)
            }
        )
    }
    changeSelect = (e, key) => {
        this.setState({ value: Object.values(this.state.options)[0], options: { ...this.state.options, [key]: e.target.value } }, () => {
            this.props.setData('options', this.state.options)
            // this.props.setData('value',this.state.value)   

        })
    }
    multiChange = (checkedValues) => {
        this.setState({ value: checkedValues }, () => { this.props.setData('value', checkedValues) })
    }
    singleChange = e => {
        this.setState({
            value: e.target.value
        }, () => {
            this.props.setData('value', e.target.value)
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
        const { Option } = Select;

        return <>{this.props.data.hasOwnProperty('isMulti') && this.props.data.options ? this.props.viewMode ?
            <Select
                mode={this.props.data.isMulti ? 'multiple' : 'single'}
                style={{ width: '70%' }}
                placeholder="Please select"
                onChange={this.handleChange}
                defaultValues={this.props.data.value}
            >
                {Object.values(this.props.data.options).map((item, key) => { if (item !== "") return <Option key={item}>{item}</Option> })}
            </Select> :
            <>
                <div className="checkbox-container">
    <Checkbox className="select-component-multiple-select" defaultChecked={this.props.data.isMulti} onChange={this.onChange}>Multi Select</Checkbox>

                {this.props.data.isMulti ? <Checkbox.Group defaultValue={this.props.data.value} onChange={this.multiChange}>
                    {
                        Object.keys(this.props.data.options).map((item, key) => {
                            return <Checkbox key={key} value={item}>
                                <Input
    className="input-field-design"
                                        style={{ width: 200 }}
                                        placeholder={`Value ${key}`}
                                                                      
  contentEditable
                                    readOnly={this.props.viewMode}
                                    defaultValue={this.props.data.options[item]}
                                    onChange={(e) => this.changeCheck(e, key)}
                                />
                            </Checkbox>

                        })
                    }
                </Checkbox.Group> :<Radio.Group defaultValue={this.props.data.value} onChange={this.singlChange}>                       
 {
                            Object.keys(this.props.data.options).map((item, key) => {
                                return <Radio key={key} value={item}>
                                    <Input
                                        className="input-field-design"
                                        style={{ width: 200 }}
                                        placeholder={`Value ${key}`}
                                        contentEditable
                                        defaultValue={this.props.data.options[item]}
                                        readOnly={this.props.viewMode}
                                       onChange={(e) => this.changeRadio(e, item)}
                                    />
                                </Radio>
                            })
                        }
                    </Radio.Group>}

                            <div onClick={this.addSelect} className="add-more-checkbox-btn">Add Option</div>
                        
                </div>
            </> : null}</>
    }
}

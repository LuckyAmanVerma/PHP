import React, { Component } from 'react'
import { Row, Col, Button, Upload, Icon, message, Select, Input, Radio } from 'antd';
const { Option } = Select;
const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },

};

const exType = ['.csv', '.xls', '.pdf', '.doc', '.txt'];

const children = [];
for (let i = 0; i < exType.length; i++) {
  children.push(<Option key={exType[i]}>{exType[i]}</Option>);
}


export default class FileUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "upload",
      value: "",
      selectedFileTypeValue: null,
      defaultSelectedFiles: [],
      count: 0,
      fileSize: 3,
      NumOfFiles: 1,
      Multiple: true,

      validation: {
      }
    }

  }
  beforeUpload = (fileList) => {
    this.setState({ count: this.state.count + 1 }, () => {
      console.log(this.state.count)
      const isLt2M = fileList.size / 1024 / 1024 < this.props.data.fileSize;
      if (!isLt2M) {
        message.error('Image must smaller than 3MB!');
      }
      return isLt2M;
    })
  }

  handleFileTypehange = (e) => {
    this.setState({ defaultSelectedFiles: e }, () => {
      this.props.setMultipleData({ selectedFileTypeValue: e.join(','), defaultSelectedFiles: this.state.defaultSelectedFiles });
    })
  }
  handleFileSizechange = (e) => {
    this.props.setData('fileSize', Number(e.target.value))
    //this.setState({fileSize:e.target.value})
  }
  handleFileNumberchange = (e) => {
    // this.setState({NumOfFiles:e.target.value});       
    this.props.setData('NumOfFiles', Number(e.target.value))
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
    return (
      <div className="file-uploader" style={{ padding: '12px' }}>
        {!this.props.viewMode ?
          (<Row>
            <Col span={5}><label>File Type</label></Col>
            <Col span={9}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={this.handleFileTypehange}
                defaultValue={this.props.data.defaultSelectedFiles}
              >
                {children}
              </Select>
            </Col>
          </Row>) : null}
        {!this.props.viewMode ? (<Row style={{ marginTop: "10px" }}>

          <Col span={5}><label>Maximum File Size</label></Col>
          <Col span={2}>
            <Input size="small" className="input-field-design" disabled={this.props.viewMode} placeholder="File size" value={this.props.data.fileSize} onInput={this.handleFileSizechange} />
          </Col>
        </Row>) : null}
        {!this.props.viewMode ? (<Row style={{ marginTop: "10px" }}>
          <Col span={5}><label>Maximum Number of File</label></Col>
          <Col span={2}>
            <Input size="small" className="input-field-design" disabled={this.props.viewMode} placeholder="Number of Files" value={this.props.data.NumOfFiles} onInput={this.handleFileNumberchange} />
          </Col>
        </Row>) : null}
        <Upload disabled={!this.props.viewMode} {...props} multiple={this.state.Multiple} accept={this.props.data.selectedFileTypeValue} beforeUpload={this.beforeUpload}>
          <Button className="file-upload-btn">
            <Icon type="upload" /> Upload
            </Button>
        </Upload>
      </div>
    )
  }
}

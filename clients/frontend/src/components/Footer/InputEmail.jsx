import React from 'react';
import {Row, Col, Input, Button} from 'antd';
import {MailOutlined,FacebookOutlined,YoutubeOutlined} from '@ant-design/icons';
import './style.css';
const InputEmail = () =>{
    return (
        <div className="input-email">
            <div className="container">
                <div className="input-email-main">
                    <Row justify="space-around">
                        <Col md={18} sm={18} xs={24} style={{display: 'flex', justifyContent: 'center'}}>
                            <Input style={{width:'70%', marginRight: '5px'}} placeholder="Nhập email để nhận thông báo tin khuyến mại" />
                            <Button icon={<MailOutlined  style={{color:'black',}}/>} size="large" />
                        </Col>
                        <Col md={4} sm={6} xs={4}>
                        <FacebookOutlined style={{fontSize: '24px', color:'gray', paddingRight:'5px', paddingTop:'10px', cursor:'pointer'}}/>
                        <YoutubeOutlined style={{fontSize: '24px', color:'gray', paddingRight:'5px', paddingTop:'10px', cursor:'pointer'}}/>
                        <MailOutlined style={{fontSize: '24px', color:'gray', paddingRight:'5px', paddingTop:'10px', cursor:'pointer'}}/>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
export default InputEmail;
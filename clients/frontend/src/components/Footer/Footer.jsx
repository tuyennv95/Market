import React from 'react';
import FooterBot from './FooterBot';
import FooterMid from './FooterMid';
import FooterTop from './FooterTop';
import InputEmail from './InputEmail';

const Footer = () =>{
    return (
        <>
            <InputEmail/>
            <FooterTop/>
            <FooterMid />
            <FooterBot/>
        </>
    )
}
export default Footer;
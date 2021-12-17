import React from 'react';
import imgNF from 'Access/image/giphy.gif';
import {Link} from 'react-router-dom';
const NotFound = () => {
    return (
        <div style={{padding: '100px',backgroundColor:'#AFF0E4', textAlign:'center'}}>
            <img src={imgNF} style={{ margin: '0 auto'}}/>
            <Link style={{fontSize:'30px', textTransform:'uppercase'}} to="">Về Trang chủ</Link>
        </div>
    );
};

export default NotFound;
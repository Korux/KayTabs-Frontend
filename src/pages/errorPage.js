import React from 'react';
import styled from 'styled-components';

function Error(){

    const Error = styled.div`
        margin-top:150px;
    `;
    return(<Error>
        <h1>Error</h1>
        <span>This page does not exist.	(｡•́︿•̀｡)</span>
    </Error>);

}

export default Error;
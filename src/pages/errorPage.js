import React from 'react';
import styled from 'styled-components';

const Err = styled.div`
    margin-top:150px;
`;

function Error(){
    return(<Err>
        <h1>Error</h1>
        <span>This page does not exist.	(｡•́︿•̀｡)</span>
    </Err>);

}

export default Error;
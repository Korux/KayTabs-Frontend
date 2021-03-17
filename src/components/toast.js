import React from "react";
import {Toast} from 'react-bootstrap';
import styled from 'styled-components';

/*
Success Toast
*/ 

const SToast = styled(Toast)`
    background-color:rgb(30,30,220);
    opacity:0.9 !important;
    color:rgb(220,220,220) !important;
    position: fixed;
    top:1rem;
    right:0;
    left:0;
    margin: auto;
    z-index: 7000;
    color:black;
    font-size:18px;
`;

const EToast = styled(Toast)`
    background-color:rgb(220,30,30);
    opacity:0.9 !important;
    color:rgb(220,220,220) !important;
    position: fixed;
    top:1rem;
    right:0;
    left:0;
    margin: auto;
    z-index: 7000;
    color:black;
    font-size:18px;
`;

export function SuccessToast(props){

    return(
        <SToast onClose={props.onClose} show={props.show} delay = {2000} autohide>
            
            <Toast.Body>{props.message}</Toast.Body>
        </SToast>
    );
}

/*
Error Toast
*/ 

export function ErrorToast(props){
    return(
        <EToast onClose={props.onClose} show={props.show} delay = {2000} autohide>
            
            <Toast.Body>{props.message}</Toast.Body>
        </EToast>
    );
}

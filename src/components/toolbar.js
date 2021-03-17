import React from 'react';
import styled from 'styled-components';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import Eighth from '../images/eighth.png';
import Sixteenth from '../images/sixteenth.png';
import Half from '../images/half.png';
import Whole from '../images/whole.png';
import Quarter from '../images/quarter.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const StyledToolbar = styled.div`
    position:fixed;
    height : 50px;
    width : 1050px;
    margin : auto;
    left:50%;
    margin-left:-525px;
    background-color : rgb(100,100,100);
    box-shadow: 0 2px 3px rgb(100,100,100);
    z-index:999;
`;

const ToolbarContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    height : 50px;
    width:90%;
    margin:auto;
    text-align:left !important;
`;

const TabTitle = styled.input`
    border:none;
    height:70%;
    width:45%;
    background-color : rgb(70,70,70);
    padding:0 10px;
    border-radius:10px;
    letter-spacing:1px;
    color:${({theme}) => theme.primaryLight};
    margin:0 10px;

    &:focus{
        outline:none;
        text-decoration:underline;
        text-decoration-color:rgb(180,180,180);
    }
`;

const StyledNote = styled.img`
    width : auto;
    height:90%; 
`;

const TButtonContainer = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    aspect-ratio:1;
    height:80%;
    color:white;
    background-color: ${props => props.type === props.selected ? 'rgb(70,125,200)' : 'rgb(50,50,50)'};
    box-shadow:0 0 2px ${props => props.type === props.selected ? 'rgb(70,125,200)' : 'rgb(50,50,50)'};
    margin:-2px 3px 0px 3px;
    transition: all 0.1s linear;
    border-radius: 5px;
    &:hover{
        cursor:pointer;
        background-color:${props => props.type === props.selected ? 'rgb(60,110,220)' : 'rgb(20,20,20)'}; 
    }
`;

const TModeContainer = styled(TButtonContainer)`

    border-radius : 50%;
    background-color : ${props => props.type === props.selected ? (props.type === 'plus' ? 'rgb(40,160,30)' : 'rgb(150,50,20)') : 'rgb(50,50,50)'};
    box-shadow:0 0 2px ${props => props.type === props.selected ? (props.type === 'plus' ? 'rgb(40,160,30)' : 'rgb(150,50,20)')  : 'rgb(50,50,50)'};

    &:hover{
        cursor:pointer;
        background-color:${props => props.type === props.selected ? (props.type === 'plus' ? 'rgb(20,140,20)' : 'rgb(130,10,10)') : 'rgb(20,20,20)'}; 
    }

`;

const FaIcon = styled(FontAwesomeIcon)`
    color:rgb(220,220,220);
    margin:0px 10px;

`;





function ToolBar(props){

    return(
        <>
        <StyledToolbar>
            <ToolbarContainer>
                
                <TButtonContainer type={"whole"} selected={props.note} onClick={() => props.setNote("whole")}>
                    <StyledNote src={Whole} alt="note"/>
                </TButtonContainer>

                <TButtonContainer type={"half"} selected={props.note} onClick={() => props.setNote("half")}>
                    <StyledNote src={Half} alt="note"/>
                </TButtonContainer>

                <TButtonContainer type={"quarter"} selected={props.note} onClick={() => props.setNote("quarter")}>
                    <StyledNote src={Quarter} alt="note"/>
                </TButtonContainer>

                <TButtonContainer type={"eighth"} selected={props.note} onClick={() => props.setNote("eighth")}>
                    <StyledNote src={Eighth} alt="note"/>
                </TButtonContainer>

                <TButtonContainer type={"sixteenth"} selected={props.note} onClick={() => props.setNote("sixteenth")}>
                    <StyledNote src={Sixteenth} alt="note"/>
                </TButtonContainer>


        

                <OverlayTrigger
                    key={"2"}
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                        Song Title
                        </Tooltip>
                    }
                    >
                    <TabTitle placeholder={"Song Name"} value={props.title} onChange={(e) => props.setTitle(e.target.value)}></TabTitle>
                    
                </OverlayTrigger>


                <OverlayTrigger
                    key={"0"}
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                        Add Notes
                        </Tooltip>
                    }
                    >
                    <TModeContainer type={"plus"} selected={props.mode} onClick={() => props.setMode("plus")}>
                        <FaIcon icon={faPlusCircle} size={"lg"}/>
                    </TModeContainer>
                    
                </OverlayTrigger>

                <OverlayTrigger
                    key={"1"}
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                        Remove Notes
                        </Tooltip>
                    }
                    >
                    <TModeContainer type={"minus"} selected={props.mode} onClick={() => props.setMode("minus")}>
                        <FaIcon icon={faMinusCircle} size={"lg"}/>
                    </TModeContainer>
                    
                </OverlayTrigger>

            </ToolbarContainer>

        </StyledToolbar>
        </>
    );

}

export default ToolBar;
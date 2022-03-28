import React, { Fragment } from 'react'
import styled from 'styled-components';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleDown, faPlus, faMinus, faSave, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import { getUserLoggedIn } from '../redux/selectors';
import { useSelector } from 'react-redux';

const StyledButton = styled.button`
    background-color: rgb(80,80,80);
    border: none;


    text-align: center;
    line-height:50%;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;

    border-radius: 50%;
    width:50px;
    height:50px;

    margin:15px 0;
    box-shadow:0 0 10px rgb(60,60,60);

    transition: all 0.3s ease-in-out;
    
    &:hover{
        background-color: rgb(120,120,120);
    }

    &:disabled{
        background-color: rgb(170,170,170);
        
    }

    &:disabled:hover{
        width:50px;
        height:50px;
    }

`;

const ResetButton = styled(StyledButton)`
    scroll-behavior:smooth;
    width:65px;
    height:65px;
    &:hover{
        background-color: rgb(120,120,120);
        width:65px;
        height:65px;
    }
`;

const StyledIcon = styled(FontAwesomeIcon)`
    margin-left:0px;
    color:white;
`;

const StyledIconAlt = styled(FontAwesomeIcon)`
    margin-left:4px;
    color:white;
`;

const ButtonContainer = styled.div`
    position:fixed;
    right:40px;
    top:40%;
    width:50px;
    z-index:999;
`;

const ResetContainer = styled.div`
    scroll-behavior:smooth;
    position:fixed;
    right:20px;
    bottom:5px;
    width:65px; 
    z-index:999;
`;

function EditorSideButtons(props){

    const loggedIn = useSelector(getUserLoggedIn);

    return(
        <Fragment>
            <ButtonContainer>

                <OverlayTrigger
                    key={"left00"}
                    placement={"left"}
                    overlay={
                        <Tooltip id={`tooltip-left`}>
                        Reset Tablature
                        </Tooltip>
                    }
                    >
                    <StyledButton disabled={props.playing} onClick={props.onClear}>
                        <StyledIcon size={"lg"} icon={faUndoAlt}/>
                    </StyledButton>
                </OverlayTrigger>


                <OverlayTrigger
                    key={"left01"}
                    placement={"left"}
                    overlay={
                        <Tooltip id={`tooltip-left`}>
                        Add Measure
                        </Tooltip>
                    }
                    >
                    <StyledButton disabled={props.playing} onClick={props.onAdd}>
                        <StyledIcon size={"lg"} icon={faPlus}/>
                    </StyledButton>
                </OverlayTrigger>

                <OverlayTrigger
                    key={"left2"}
                    placement={"left"}
                    overlay={
                        <Tooltip id={`tooltip-left`}>
                        Remove Measure
                        </Tooltip>
                    }
                    >
                    <StyledButton disabled={props.playing} onClick={props.onRemove}>  
                        <StyledIcon size={"lg"} icon={faMinus}/>
                    </StyledButton>
                </OverlayTrigger>

                <OverlayTrigger
                    key={"left3"}
                    placement={"left"}
                    overlay={
                        <Tooltip id={`tooltip-left`}>
                        Play Tablature
                        </Tooltip>
                    }
                    >
                    <StyledButton disabled={props.playing} onClick={props.onPlay}>
                        <StyledIconAlt size={"lg"} icon={faPlay}/>
                    </StyledButton>
                </OverlayTrigger>

                <OverlayTrigger
                    key={"left4"}
                    placement={"left"}
                    overlay={
                        <Tooltip id={`tooltip-left`}>
                        Save Tablature
                        </Tooltip>
                    }
                    >
                    <StyledButton disabled={!loggedIn} onClick={props.onSave}>
                        <StyledIcon size={"lg"} icon={faSave}/>
                    </StyledButton>
                </OverlayTrigger>

            </ButtonContainer>

            <ResetContainer>
                <ResetButton onClick={() => window.scroll({top: document.body.scrollHeight,behavior: 'smooth'  })}>
                    <StyledIcon size={"2x"} icon={faAngleDown}/>
                </ResetButton>
            </ResetContainer>
        </Fragment>
    );

}

export default EditorSideButtons;
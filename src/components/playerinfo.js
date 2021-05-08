import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faTachometerAlt, faClock, faListOl} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

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
        width:60px;
        height:60px;
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

const ResetContainer = styled.div`
    scroll-behavior:smooth;
    position:fixed;
    right:20px;
    bottom:5px;
    width:65px; 
`;
const StyledIcon = styled(FontAwesomeIcon)`
    margin-left:0px;
    color:white;
`;

const InfoContainer = styled.div`
    position:fixed;
    right:0;
    top:15%;
    width:25%;
    height:55%;
    z-index:999;
`;

const StyledImage = styled.img`
    height:60%;
    width:100%;
    object-fit:cover;
    border-top-left-radius:20px;
`;

const SongInfo = styled.div`
    width:100%;
    height:40%;
    background-color:rgb(20,20,20);
    border-bottom-left-radius:20px;
`;

const SongTitle = styled.div`
    font-size:34px;
    font-weight:600;
    text-align:left !important;
    margin-left:10px;

`;

const SongAuthor = styled.div`
    text-align:left !important;
    font-size:16px;
    font-weight:500;
    margin-left:15px;
    margin-bottom:20px;
`;
const SongAuthorLink = styled(Link)`
    color:rgb(120,100,150);

`;

const OtherInfo = styled.span`
    width:
    text-align:right !important;
    padding:0 30px;
    font-size:18px;
    font-weight:600;
    color:	rgb(255,215,0);
    
`;

const OtherInfoIcon = styled(FontAwesomeIcon)`
    text-align: center;
    width:40px;
    margin:auto;
    color:white;
`;

const PlayContainer = styled.div`
    width:100%;
    height:50px;
    border:none;
    margin:30px auto;
   
    
    button{
        border-radius:10px;
        width:60%;
        height:40px;
        box-shadow:0 0 8px rgb(60,60,60);
        background-color: rgb(80,80,80);
        border: none;
        text-align: center;
        line-height:50%;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        color:rgb(230,230,230);
        transition: all 0.1s ease-in-out;
        &:hover{
            background-color: rgb(120,120,120);

        }
    }
`;

function PlayerInfo(props){

    function secsToTime(time){
        let mins = 0;
        let secs = time;
        while(secs >= 60){
            mins += 1;
            secs -= 60;
        }
        return mins + ":" + (secs < 10 ? '0' + secs : secs);
    }

    return(
        <>
            <InfoContainer>
                <StyledImage src={props.data.image}/> 
                <SongInfo>
                    <SongTitle>{props.data.title}</SongTitle>
                    <SongAuthor>
                        created by: <SongAuthorLink to={"/profile/" + props.data.owner}>{props.data.ownername}</SongAuthorLink>
                    </SongAuthor>

                    <OverlayTrigger
                    key={"0"}
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                        BPM
                        </Tooltip>
                    }
                    >
                        <OtherInfo><OtherInfoIcon icon={faTachometerAlt} size={"lg"}/> : {props.data.bpm}</OtherInfo>
                    </OverlayTrigger>

                    <OverlayTrigger
                    key={"1"}
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                        Length
                        </Tooltip>
                    }
                    >
                        <OtherInfo><OtherInfoIcon icon={faClock} size={"lg"}/> : {secsToTime(props.data.length)}</OtherInfo>
                    </OverlayTrigger>

                    <OverlayTrigger
                    key={"2"}
                    placement={"bottom"}
                    overlay={
                        <Tooltip id={`tooltip-bottom`}>
                        Measure Count
                        </Tooltip>
                    }
                    >
                        <OtherInfo><OtherInfoIcon icon={faListOl} size={"lg"}/> : {props.data.measures}</OtherInfo>
                    </OverlayTrigger>
                    <PlayContainer>
                        <button onClick={props.onPlay}>Play</button>
                    </PlayContainer>
                </SongInfo>

            </InfoContainer>

            <ResetContainer>
                <ResetButton onClick={() => window.scroll({top: document.body.scrollHeight,behavior: 'smooth'  })}>
                    <StyledIcon size={"2x"} icon={faAngleDown}/>
                </ResetButton>
            </ResetContainer>
        </>
    );
}

export default PlayerInfo;

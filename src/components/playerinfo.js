import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faTachometerAlt, faClock, faListOl, faStar} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import { getUserCreds } from '../redux/selectors';
import { useSelector } from 'react-redux';


import globalVars from '../global';

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
    z-index:999;
`;
const StyledIcon = styled(FontAwesomeIcon)`
    margin-left:0px;
    color:white;
`;

const InfoContainer = styled.div`
    position:fixed;
    right:0;
    top:15%;
    width:max(25%,400px);
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

const SongTitleContainer = styled.div`
    margin-left:15px;
    display : flex;
    justify-content : flex-start;
    align-items : center;
`;

const SongTitle = styled.div`
    font-size:34px;
    font-weight:600;
    text-align:left !important;
    margin-right : 10px;
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

        &:disabled{
            background-color: rgb(120,120,120);
        }

        &:disabled:hover{
            background-color: rgb(120,120,120);
        }
    }
`;

const StarIcon = styled(FontAwesomeIcon)`
    transition : all 0.1s ease-in-out;
    cursor : pointer;
    color : ${({starred}) => starred === 'true' ? 'rgb(255,255,102)' : 'rgb(200,200,200)'}
`;

function PlayerInfo(props){

    var userInfo = useSelector(getUserCreds);
    const [userStarred, setStarred] = React.useState(null);

    
    const [onwerName, setOwnerName] = React.useState('-');


    //componentdidmount, get tab owner name
    useEffect(() => {
        let mounted = true;
        fetch(globalVars.server + '/users/' + props.data.owner)
        .then(response => response.json())
        .then(data => {
            if(mounted)setOwnerName(data.name);
        });
        return () => {
            mounted = false;
        }

    },[props.data]);

    useEffect(() => {
        let mounted = true;
        if(mounted && userInfo.id){
            fetch(globalVars.server + '/users/' + userInfo.id)
            .then(response => response.json())
            .then(data => {
                if(mounted)setStarred(data.starred);
            });
        }
    },[userInfo]);


    function secsToTime(time){
        let mins = 0;
        let secs = time;
        while(secs >= 60){
            mins += 1;
            secs -= 60;
        }
        return mins + ":" + (secs < 10 ? '0' + secs : secs);
    }

    function starClick(){
        let starred = userStarred!==null && userStarred.includes(props.data._id);
        if(starred){
            let reqPutOpts = {
                method : 'DELETE',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({type:"star"}),
            }
            fetch(globalVars.server + '/users/' + userInfo.id + '/tabs/' + props.data._id, reqPutOpts)
            .then(response => response.json())
            .then(data => {
                if(!data.Error){
                    let newStar = userStarred.slice();
                    newStar = newStar.filter(val => val !== props.data._id);
                    setStarred(newStar);
                }
            });
        }else{
            let reqPutOpts = {
                method : 'PUT',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({type:"star"}),
            }
            fetch(globalVars.server + '/users/' + userInfo.id + '/tabs/' + props.data._id, reqPutOpts)
            .then(response => response.json())
            .then(data => {
                if(!data.Error){
                    let newStar = userStarred.slice();
                    newStar.push(props.data._id);
                    setStarred(newStar);
                }
            });
        }
    }

    return(
        <Fragment>
            <InfoContainer>
                <StyledImage src={props.data.image}/> 
                <SongInfo>
                    <SongTitleContainer>
                        <SongTitle>{props.data.title}</SongTitle>
                        {userInfo.loggedin && !props.nostar && <StarIcon icon={faStar} size={"1x"} onClick={starClick} starred={userStarred!==null && userStarred.includes(props.data._id) ? 'true' : 'false'}/>}
                    </SongTitleContainer>
                    <SongAuthor>
                        created by: <SongAuthorLink to={"/profile/" + props.data.owner}>{onwerName}</SongAuthorLink>
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
                        <button disabled={props.playing} onClick={props.onPlay}>Play</button>
                    </PlayContainer>
                </SongInfo>

            </InfoContainer>

            <ResetContainer>
                <ResetButton onClick={() => window.scroll({top: document.body.scrollHeight,behavior: 'smooth'  })}>
                    <StyledIcon size={"2x"} icon={faAngleDown}/>
                </ResetButton>
            </ResetContainer>
        </Fragment>
    );
}

export default PlayerInfo;

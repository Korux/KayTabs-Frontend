import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faTachometerAlt, faClock, faListOl, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link, useHistory } from 'react-router-dom';
import { getUserCreds } from '../redux/selectors';
import { useSelector } from 'react-redux';

import globalVars from '../global';
import { SuccessToast, ErrorToast } from './toast';

const TabContainer = styled.div`
    width : 95%;
    height:280px;
    margin:40px auto;
    background-color : rgb(100,100,100);
    border-radius : 5px;
    box-shadow:0 0 5px rgb(60,60,60);
    color:rgb(210,210,210);
`;

const TabImage = styled.img`
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width:100%;
    object-fit:cover;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
`;

const ImageDim = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    width:100%;
    height:100%;
    background-color:rgba(10,10,10,0.5);
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    opacity:0;
    &:hover{
        opacity:1;
    }

`;

const ImageContainer = styled.div`
    width:100%;
    height:70%;
    position:relative;

`;

const DownloadIcon = styled(FontAwesomeIcon)`
    position:absolute;
    width:100%;
    height:auto;
    color:rgb(210,210,210);

    &:hover{
        cursor:pointer;
        color:rgb(230,230,230);
    }
`;

const InfoContainer = styled.div`
    width:100%;
    height:30%;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InfoColumn = styled.div`
    flex:0 0 70%;
    text-align:left !important;
`;

const OtherInfoColumn = styled.div`
    flex:0 0 30%;
    text-align:right !important;
    width:100%;
`;

const OtherInfo = styled.div`
    width:100%;
    text-align:right !important;
    padding:0 10px;
    font-size:16px;
    font-weight:600;
    color:	rgb(255,215,0)
`;

const OtherInfoIcon = styled(FontAwesomeIcon)`
text-align: center;

    width:40px;
    margin:auto;
    color:white;
`;

const SongTitle = styled.div`
    font-size:27px;
    font-weight:600;
    text-align:left !important;
    margin-left:10px;

`;

const SongAuthor = styled.div`
    text-align:left !important;
    font-size:12px;
    font-weight:500;
    margin-left:15px;
`;

const SongAuthorLink = styled(Link)`
    color:rgb(40,40,180);

`;

const StarIcon = styled(FontAwesomeIcon)`
    transition : all 0.1s ease-in-out;
    position : absolute;
    bottom : 15px;
    right : 15px;
    cursor : pointer;
    color : ${({starred}) => starred === 'true' ? 'rgb(255,255,102)' : 'rgb(200,200,200)'}
`;

const DeleteIcon = styled(FontAwesomeIcon)`
    position : absolute;
    bottom : 15px;
    right : 15px;
    cursor : pointer;
    color : rgb(230,230,230);
`;

function Tab(props){

    const history = useHistory();
    var userInfo = useSelector(getUserCreds);
    const [userStarred, setStarred] = React.useState(null);

    const [toast, setToast] = React.useState('none');
    const [toastMsg, setToastMsg] = React.useState('');

    const [onwerName, setOwnerName] = React.useState('-');


    //get tab owner name
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
        return () => {
            mounted = false;
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
                    if(props.onUpdate)props.onUpdate();
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

    function deleteClick(){
        let reqOpts = {
            method : 'DELETE',
        }
        let delTabPromise = fetch(globalVars.server + '/tabs/' + props.data._id, reqOpts);
        let reqOptsUsr = {
            method : 'DELETE',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({type:"tab"}),
        }
        let delFromUsrPromise = fetch(globalVars.server + '/users/' + userInfo.id + '/tabs/' + props.data._id, reqOptsUsr);
        Promise.all([delTabPromise,delFromUsrPromise])
        .then(results => {
            if(!results[0].Error && !results[1].Error){
                setToast('succ');
                setToastMsg('Song successfully deleted.');
                
            }else{
                setToast('err');
                setToastMsg('Error occured when deleting song. please try again later.');
            }

        });
    }

    return(
        <Fragment>
            <SuccessToast onClose={() => {setToast('none');props.onUpdate();}} show={toast === 'succ'} message={toastMsg}/>
            <ErrorToast onClose={() => setToast('none')} show={toast === 'err'} message={toastMsg}/>
            <TabContainer>
                <ImageContainer>
                    <TabImage src={props.data.image} alt="tabs"/>
                    <ImageDim>
                    <DownloadIcon icon={faPlayCircle} size={"3x"} onClick={() => history.push('/player/' + props.data._id)}/>
                    {userInfo.loggedin && !props.nostar && <StarIcon icon={faStar} size={"1x"} onClick={starClick} starred={userStarred!==null && userStarred.includes(props.data._id) ? 'true' : 'false'}/>}
                    {userInfo.loggedin && !props.nodelete && <DeleteIcon icon={faTrash} size={"1x"} onClick={deleteClick} />}
                    </ImageDim>
                </ImageContainer>

                <InfoContainer>
                    <InfoColumn>
                        <SongTitle>{props.data.title}</SongTitle>
                        <SongAuthor>
                            created by: <SongAuthorLink to={"/profile/" + props.data.owner}>{onwerName}</SongAuthorLink>
                        </SongAuthor>
                    </InfoColumn>

                    <OtherInfoColumn>
                        <OtherInfo><OtherInfoIcon icon={faTachometerAlt} size={"sm"}/> : {props.data.bpm}</OtherInfo>
                        <OtherInfo><OtherInfoIcon icon={faClock} size={"sm"}/> : {secsToTime(props.data.length)}</OtherInfo>
                        <OtherInfo><OtherInfoIcon icon={faListOl} size={"sm"}/> : {props.data.measures}</OtherInfo>
                    </OtherInfoColumn>
                    
                </InfoContainer>


            </TabContainer>
        </Fragment>
    );

}

export default Tab;
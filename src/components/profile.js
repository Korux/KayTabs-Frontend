import React, { Fragment, useState } from 'react'
import styled from 'styled-components';

import { getUserCreds } from '../redux/selectors';
import { useSelector } from 'react-redux';

import TabList from '../components/tablist';

import { faPen, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import globalVars from '../global';
import { ErrorToast, SuccessToast } from './toast';

const ProfileContainer = styled.div`
    width : max(30%,500px);

    background-color:rgb(100,100,100);
    margin:0 auto;
    margin-top:60px;
    border-radius:10px;
    padding-bottom : 10px;
`;

const ProfileImgContainer = styled.div`
    width : 30%;
    margin : 0 20px;
    display : flex;
    align-items : center;
    justify-content : center;
    flex-flow : column wrap;
`;

const ProfileImage = styled.img`

    border-radius : 50%;
    background-color:white;
    margin : 0 auto;
    margin-top:40px;
    object-fit : cover;
    width : 8rem;
    height : 8rem;


`;

const ProfileInfoContainer = styled.div`
    width : 70%;

`;

const ProfileName = styled.div`
    font-size : 28px;
    font-weight : 500;
    margin : 20px 0 0 0;
    text-align : left;
    color : rgb(250,250,250);
    display : flex;
    align-items:center;
`;

const NameEditable = styled.input`
    width : 90%;
    font-size : 28px;
    font-weight : 500;
    color : rgb(250,250,250);
    background-color : rgb(100,100,100);
    border : none;
    border-bottom : 1px solid rgb(30,30,30);
    transition : all 0.1s ease-in-out;
    &:focus{
        border-bottom : 1px solid rgb(220,220,220);
        outline : none;
    }
`;

const ProfileEmail = styled.div`
    font-size : 16px;
    font-weight : 400;
    margin : 0 0 5px 0;
    text-align : left;
    color : rgb(200,200,200);
`;

const ProfileInfo = styled.div`
    width : 100%;
    display : flex;
    align-items : center;
    justify-content : center;
    flex-flow : row wrap;

`;

const ProfileTabLabels = styled.div`
    width : 80%;
    text-align : left;
    font-size : 14px;
    font-weight : 500;
    color : rgb(200,200,200);
    padding-left : 20px;
    padding-top : 10px;
`;

const ProfileTabNums = styled.div`
    width : 20%;
    text-align : left;
    font-size : 14px;
    font-weight : 500;
    color : rgb(230,230,230);
    padding-top : 10px;
`;

const ProfileDescription = styled.div`
    background-color : rgb(50,50,50);
    width : 90%;
    height : 50%;
    margin : 20px 0 0 0;
    border-radius : .2rem;
    padding : 10px;
    text-align : left;
    color : rgb(230,230,230);
`;

const DescriptionEditable = styled.input`

`;

const MainInfoContainer = styled.div`
    display : flex;
    justify-content:center;
    width : 100%;
 

`;

const ButtonContainer = styled.div`
    width : 70%;
    margin : 10px auto;
    display : flex;
    align-items : center;
    justify-content : center;
`;

const EditIcon = styled(FontAwesomeIcon)`
    font-size : 14px;
    margin : 0 20px;
    cursor : pointer;
`;

const EditProfileIcon = styled(FontAwesomeIcon)`
    font-size : 10px;
    margin : 0 5px;
    vertical-align : middle;
    cursor : pointer;
    color : rgb(170,170,170);
`;

const EditButton = styled.button`
    background-color : rgb(220,220,220);
    cursor : pointer;
    margin : 0 10px;
    width : 30px;
    height : 1.9rem;
    border : none;
    border-radius : 3px;
    display : flex;
    justify-content : center;
    align-items : center;
`;

const EditButtonIcon = styled(FontAwesomeIcon)`
    font-size : 20px;
    color : rgb(50,50,50);
`;



const StyledButton = styled.button`
    width : 30%;
    margin : auto;
    font-weight : 500;
    font-size : 16px;
    letter-spacing : 1px;
    color : ${({active}) => active ? 'rgb(240,240,240)' : 'rgba(150,150,150,0.7)' };
    border : 1px solid ${({active}) => active ? 'rgb(150,150,250)' : 'rgb(150,150,150)' };
    background-color : ${({active}) => active ? 'rgb(70,70,220)' : 'rgba(0,0,0,0)' };
    padding : 5px 10px 5px 10px;
    text-align : center;
    transition : all 0.2s ease-in-out;
    &:hover{
        color : ${({active}) => active ? 'rgb(240,240,240)' : 'rgba(190,190,190,0.7)' };
        border : 1px solid ${({active}) => active ? 'rgb(150,150,250)' : 'rgb(190,190,190)' };
    }
`;

function Profile(props){


    const userInfo = useSelector(getUserCreds);
    const [nameEditing, setNameEditing] = useState(false);
    const [descEditing, setDescEditing] = useState(false);
    const [name, setName] = useState(props.data.name);
    const [tmpName, setTmpName] = useState(props.data.name);
    const [desc, setDesc] = useState(props.data.description);
    const [tmpDesc, setTmpDesc] = useState(props.data.description);

    const [toast, setToast] = React.useState('none');
    const [toastMsg, setToastMsg] = React.useState('');

    const nameEditCancel = () => {
        setTmpName(name);
        setNameEditing(false);
    };

    const nameEditSave = () => {
        let reqOpts = {
            method : 'PATCH',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({name:tmpName, desc:tmpDesc}),
        }

        fetch( globalVars.server + '/users/' + props.data._id, reqOpts)
        .then(response => response.json())
        .then(data =>{
            if(data.Error){
                setToast('err');
                setToastMsg("Error saving profile data. Please try again later.");
            }else{
                setName(tmpName);
                setNameEditing(false);
                setToast('succ');
                setToastMsg("Profile info saved.")
            }
        });
    };

    const descEditCancel = () => {
        setTmpDesc(desc);
        setDescEditing(false);
    };

    const descEditSave = () => {
        let reqOpts = {
            method : 'PATCH',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({name:tmpName, desc:tmpDesc}),
        }

        fetch( globalVars.server + '/users/' + props.data._id, reqOpts)
        .then(response => response.json())
        .then(data =>{
            if(data.Error){
                setToast('err');
                setToastMsg("Error saving profile data. Please try again later.");
            }else{
                setDesc(tmpDesc);
                setDescEditing(false);
                setToast('succ');
                setToastMsg("Profile info saved.")
            }
        });
    };

    return(
      
        <Fragment>
            <ErrorToast onClose={() => setToast('none')} show={toast === 'err'} message={toastMsg}/>
            <SuccessToast onClose={() => setToast('none')} show={toast === 'succ'} message={toastMsg}/>
            <ProfileContainer>

                <MainInfoContainer>

                    <ProfileImgContainer>
                        <ProfileImage src={props.data.image} alt="pfp"/>
                        <ProfileInfo>
                            <ProfileTabLabels>
                            Created Tabs:<br/>
                            Starred Tabs:
                            </ProfileTabLabels>
                            <ProfileTabNums>
                            {props.tabs !== null && props.tabs.length}<br/>
                            {props.starred !== null && props.starred.length}
                            </ProfileTabNums>
                        </ProfileInfo>
                    </ProfileImgContainer>
                    <ProfileInfoContainer>
                        <ProfileName>
                            {nameEditing && <NameEditable value={tmpName} onChange={(e) => setTmpName(e.target.value)}/>}
                            {nameEditing && <EditButton><EditButtonIcon size={"lg"} icon={faCheck} onClick={nameEditSave}/></EditButton>}
                            {nameEditing && <EditButton><EditButtonIcon size={"lg"} icon={faTimes} onClick={nameEditCancel}/></EditButton>}
                            {!nameEditing && name}
                            {props.data._id === userInfo.id && !nameEditing &&
                                <EditIcon size={"2xs"} onClick = {() => setNameEditing(true)} icon={faPen}/>
                            }
                        </ProfileName>
                        <ProfileEmail>{props.data.email}</ProfileEmail>
                        <ProfileDescription>
                            {descEditing && <DescriptionEditable value={tmpDesc} onChange={(e) => setTmpDesc(e.target.value)}/>}
                            {descEditing && <EditButton><EditButtonIcon size={"lg"} icon={faCheck} onClick={descEditSave}/></EditButton>}
                            {descEditing && <EditButton><EditButtonIcon size={"lg"} icon={faTimes} onClick={descEditCancel}/></EditButton>}
                            {!descEditing && desc}
                            {props.data._id === userInfo.id && !descEditing &&
                                <EditProfileIcon size={"2xs"} onClick = {() => setDescEditing(true)} icon={faPen}/>
                            }
                        </ProfileDescription>
                    </ProfileInfoContainer>

                </MainInfoContainer>

                <ButtonContainer>

                    <StyledButton active={props.active === 'tabs'} onClick={() => props.setTabs("tabs")}>Tabs</StyledButton>
                    <StyledButton active={props.active === 'starred'} onClick={() => props.setTabs("starred")}>Starred</StyledButton>

                </ButtonContainer>
            
            </ProfileContainer>

            <TabList onUpdate={props.onUpdate} nostar={props.active === 'tabs' || props.data._id !== userInfo.id} nodelete={props.active === 'starred' || props.data._id !== userInfo.id} data={props.active === 'tabs' ? props.tabs : props.starred}/>
        </Fragment>

    );

}

export default Profile;
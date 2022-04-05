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
    width : 75%;
    font-size : 28px;
    font-weight : 500;
    color : rgb(250,250,250);
    background-color : rgb(100,100,100);
    border : none;
    border-bottom : ${({editing}) => editing ? '1px solid rgb(30,30,30)' : '1px solid rgba(0,0,0,0)'};
    transition : all 0.1s ease-in-out;
    &:focus{
        border-bottom : ${({editing}) => editing ? '1px solid rgb(220,220,220)' : '1px solid rgba(0,0,0,0)'};
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

const DescriptionEditable = styled.textarea`
    background-color : rgba(0,0,0,0);
    font-size : 15px;
    font-weight : 500;
    border : ${({editing}) => editing ? '1px solid rgb(90,90,90)' : '1px solid rgba(0,0,0,0)'};
    outline : none;
    width : 100%;
    height : 85%;
    resize : none;
    color : rgb(230,230,230);
    overflow:auto;
    padding : 2px;
    &:focus{
        outline : none;
        border : ${({editing}) => editing ? '1px solid rgb(220,220,220)' : '1px solid rgba(0,0,0,0)'};
    }
`;

const DescriptionMaxLength = styled.div`
    float : right;
    font-size : 12px;
    font-weight : 500;
    margin-top : -2px;
`;

const MainInfoContainer = styled.div`
    display : flex;
    justify-content:center;
    width : 100%;
    height : 90%;

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

const EditButton = styled.button`
    background-color : rgb(160,160,160);
    cursor : pointer;
    margin : 0 6px 0 0 ;
    width : 1.7rem;
    height : 1.5rem;
    border : none;
    border-radius : 3px;
    display : flex;
    justify-content : center;
    align-items : center;
    box-shadow:0 0 3px rgb(190,190,190);
`;

const EditButtonIcon = styled(FontAwesomeIcon)`
    font-size : 14px;
    color : rgb(250,250,250);
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
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(props.data.name);
    const [tmpName, setTmpName] = useState(props.data.name);
    const [desc, setDesc] = useState(props.data.description);
    const [tmpDesc, setTmpDesc] = useState(props.data.description);

    const [toast, setToast] = React.useState('none');
    const [toastMsg, setToastMsg] = React.useState('');

    const editCancel = () => {
        setTmpName(name);
        setEditing(false);
        setTmpDesc(desc);
    };

    const editSave = () => {
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
                setDesc(tmpDesc);
                setEditing(false);
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
                            <NameEditable value={tmpName} readOnly={!editing} editing={editing} onChange={(e) => setTmpName(e.target.value)}/>
                            {editing && <EditButton onClick={editSave} ><EditButtonIcon size={"lg"} icon={faCheck} /></EditButton>}
                            {editing && <EditButton onClick={editCancel}><EditButtonIcon size={"lg"} icon={faTimes} /></EditButton>}
                            {props.data._id === userInfo.id && !editing &&
                                <EditIcon size={"2xs"} onClick = {() => setEditing(true)} icon={faPen}/>
                            }
                        </ProfileName>
                        <ProfileEmail>{props.data.email}</ProfileEmail>
                        <ProfileDescription>
                            <DescriptionEditable maxLength={100} readOnly={!editing} editing={editing} value={tmpDesc} onChange={(e) => setTmpDesc(e.target.value)}/>
                            {editing && <DescriptionMaxLength>{tmpDesc.length} / 100</DescriptionMaxLength>}
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
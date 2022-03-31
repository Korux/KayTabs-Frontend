import React, { Fragment } from 'react'
import styled from 'styled-components';

import { getUserCreds } from '../redux/selectors';
import { useSelector } from 'react-redux';

import TabList from '../components/tablist';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    vertical-align : middle;
    cursor : pointer;
`;

const EditProfileIcon = styled(FontAwesomeIcon)`
    font-size : 10px;
    margin : 0 5px;
    vertical-align : middle;
    cursor : pointer;
    color : rgb(170,170,170);
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

    return(
      
        <Fragment>
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
                            {props.data.tabs.length}<br/>
                            {props.data.starred.length}
                            </ProfileTabNums>
                        </ProfileInfo>
                    </ProfileImgContainer>
                    <ProfileInfoContainer>
                        <ProfileName>{props.data.name}<EditIcon size={"2xs"} onClick = {()=> console.log("sss")} icon={faPen}/></ProfileName>
                        <ProfileEmail>{props.data.email}</ProfileEmail>
                        <ProfileDescription>{props.data.description}<EditProfileIcon size={"2xs"} onClick = {()=> console.log("sss")} icon={faPen}/></ProfileDescription>
                    </ProfileInfoContainer>

                </MainInfoContainer>
                {/* is my page:{props.data._id === userInfo.id ? "TRUE" : "FALSE"}<br/> */}

                <ButtonContainer>

                    <StyledButton active={props.active === 'tabs'} onClick={() => props.setTabs("tabs")}>Tabs</StyledButton>
                    <StyledButton active={props.active === 'starred'} onClick={() => props.setTabs("starred")}>Starred</StyledButton>

                </ButtonContainer>
            
            </ProfileContainer>

            <TabList nostar={true} data={props.tabData}/>
        </Fragment>

    );

}

export default Profile;
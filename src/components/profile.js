import React, { Fragment } from 'react'
import styled from 'styled-components';

import { getUserCreds } from '../redux/selectors';
import { useSelector } from 'react-redux';

import TabList from '../components/tablist';

const ProfileContainer = styled.div`
    width : max(40%,600px);
    height : 400px;
    background-color:rgb(100,100,100);
    margin:0 auto;
    margin-top:60px;
    border-radius:50px;
`;

const ProfileImgContainer = styled.div`
    width : 30%;

`;

const ProfileImage = styled.img`

    border-radius : 50%;
    background-color:white;
    margin : 0 auto;
    margin-top:80px;
    object-fit : cover;
    width : 8rem;
    height : 8rem;


`;

const ProfileInfoContainer = styled.div`
    width : 70%;

`;

const ProfileName = styled.div``;

const ProfileInfo = styled.div``;

const MainInfoContainer = styled.div`
    display : flex;
    justify-content:center;
    width : 100%;
    height : 50%;

`;

const ButtonContainer = styled.div``;

function Profile(props){


    const userInfo = useSelector(getUserCreds);

    return(
      
        <Fragment>
            <ProfileContainer>

                <MainInfoContainer>

                    <ProfileImgContainer>
                        <ProfileImage src={props.data.image} alt="pfp"/>
                    </ProfileImgContainer>
                    <ProfileInfoContainer>
                        <ProfileName>{props.data.name}</ProfileName>
                        <ProfileInfo>
                        email:{props.data.email}<br/>
                        no. tabs:{props.data.tabs.length}<br/>
                        no. starred:{props.data.starred.length}<br/>
                        </ProfileInfo>
                    </ProfileInfoContainer>

                </MainInfoContainer>

                description:{props.data.description}<br/>
                is my page:{props.data._id === userInfo.id ? "TRUE" : "FALSE"}<br/>

                <ButtonContainer>

                    <button onClick={() => props.setTabs("tabs")}>Tabs</button>
                    <button onClick={() => props.setTabs("starred")}>Starred</button>

                </ButtonContainer>
            
            </ProfileContainer>

            <TabList data={props.tabData}/>
        </Fragment>

    );

}

export default Profile;
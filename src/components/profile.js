import React from 'react';
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

const ProfileImage = styled.img`

    border-radius : 50%;
    background-color:white;
    margin : 0 auto;
    margin-top:80px;
    object-fit : cover;
    width : 8rem;
    height : 8rem;


`;


function Profile(props){


    const userInfo = useSelector(getUserCreds);

    return(
      
        <>
            <ProfileContainer>
                <ProfileImage src={props.data.image} alt="pfp"/><br/>
                name:{props.data.name}<br/>
                email:{props.data.email}<br/>
                description:{props.data.description}<br/>
                no. tabs:{props.data.tabs.length}<br/>
                no. starred:{props.data.starred.length}<br/>
                is my page:{props.data._id === userInfo.id ? "TRUE" : "FALSE"}<br/>
                <button onClick={() => props.setTabs("tabs")}>Tabs</button>
                <button onClick={() => props.setTabs("starred")}>Starred</button>
            
            </ProfileContainer>

            <TabList data={props.tabData}/>
        </>

    );

}

export default Profile;
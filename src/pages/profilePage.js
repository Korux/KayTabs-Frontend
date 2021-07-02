import React, { useEffect, Fragment } from 'react';
import {  useParams } from 'react-router-dom';
import styled from 'styled-components';

import Profile from '../components/profile';

function KTabsProfile(){
    const { id } = useParams();
    const [profileInfo, setInfo] = React.useState(null);
    const [tabInfo, setTabInfo] = React.useState(null);
    const [starInfo, setStarInfo] = React.useState([]);
    const [tabType, setType] = React.useState("tabs");

    useEffect(() => {
        fetch('http://localhost:3000/users/' + id)
        .then(response => response.json())
        .then(data => {
            setInfo(data);
        });
        if(profileInfo !== null){
            fetch('http://localhost:3000/tabs?search=' + profileInfo.name)
            .then(response => response.json())
            .then(data => {
                setTabInfo(data);
            });
            setStarInfo([]);
        }
    },[id, profileInfo]);

    function setTabs(type){
        setType(type);
    }

    function genProfile(){
        if(profileInfo === null){
            return(<Fragment></Fragment>);
        }
        if(profileInfo.Error){
            const Error = styled.div`
                margin-top:150px;
            `;
            return(<Error>
                <h1>Error</h1>
                <span>Could not find the given user. Please try again later. (｡•́︿•̀｡)</span>
            </Error>);
        }
        return(<Profile data={profileInfo} tabData={tabType === "tabs" ? tabInfo : starInfo} setTabs={setTabs}/>);
    }

    return(
        <Fragment>
            {genProfile()}
        </Fragment>
    );

}

export default KTabsProfile;
import React, { useEffect, Fragment } from 'react';
import {  useParams } from 'react-router-dom';
import styled from 'styled-components';

import Profile from '../components/profile';
import globalVars from '../global';
import Loading from 'react-loading';

const ProfileLoading = styled(Loading)`
    margin : 150px auto;
`;

function KTabsProfile(){
    const { id } = useParams();
    const [profileInfo, setInfo] = React.useState(null);
    const [tabInfo, setTabInfo] = React.useState(null);
    const [starInfo, setStarInfo] = React.useState([]);
    const [tabType, setType] = React.useState("tabs");

    useEffect(() => {
        let mounted = true;
        if(profileInfo === null){
            fetch(globalVars.server + '/users/' + id)
            .then(response => response.json())
            .then(data => {
                if(mounted)setInfo(data);
            });
        }
        if(profileInfo !== null){
            fetch(globalVars.server + '/tabs?search=' + profileInfo.name)
            .then(response => response.json())
            .then(data => {
                if(mounted)setTabInfo(data);
            });
            setStarInfo([]);
        }

        return () => {
            mounted = false;
        }
    },[id, profileInfo]);

    function setTabs(type){
        setType(type);
    }

    function genProfile(){
        if(profileInfo === null){
            return(<ProfileLoading type={'spin'} color={'#DDDDDD'} height={'10%'} width={'10%'} />);
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
        return(<Profile data={profileInfo} active={tabType} tabData={tabType === "tabs" ? tabInfo : starInfo} setTabs={setTabs}/>);
    }

    return(
        <Fragment>
            {genProfile()}
        </Fragment>
    );

}

export default KTabsProfile;
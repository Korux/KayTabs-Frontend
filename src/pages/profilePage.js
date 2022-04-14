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
    const [starInfo, setStarInfo] = React.useState(null);
    const [tabType, setType] = React.useState("tabs");
    const [value, setValue] = React.useState(0);


    //load tab data when profile info changes
    useEffect(() => {
        let mounted = true;
        if(profileInfo !== null){

            fetch(globalVars.server + '/users/' + id + '/tabs')
            .then(response => response.json())
            .then(data => {
                if(mounted)setTabInfo(data);
            });

            fetch(globalVars.server + '/users/' + id + '/starred' )
            .then(response => response.json())
            .then(data => {
                if(mounted)setStarInfo(data);         
            });
            
        }

        return () => {
            mounted = false;
        }
    },[profileInfo]);

    // get new profile info on id change or value update

    useEffect(() => {
        let mounted = true;
        fetch(globalVars.server + '/users/' + id)
        .then(response => response.json())
        .then(data => {
            if(mounted)setInfo(data);
        });
        return () => {
            mounted = false;
        }
    },[id, value]);

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
        return(<Profile onUpdate={() => setValue(value=>value+1)} data={profileInfo} active={tabType} tabs={tabInfo} starred={starInfo} setTabs={setTabs}/>);
    }

    return(
        <Fragment>
            {genProfile()}
        </Fragment>
    );

}

export default KTabsProfile;
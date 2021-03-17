import React, { useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import styled from 'styled-components';

import Measure from '../components/measure';
import MeasureBase from '../components/measurebase';
import MeasureEnd from '../components/measureend';

import PlayerInfo from '../components/playerinfo';

const MeasureContainer = styled.div`
    padding-top:100px;
    height : auto;
    width : fit-content;
    background-color:${({theme}) => theme.primaryDark};
    margin:0 100px;
`;

function KTabsPlayer(){
    const { id } = useParams();
    const [tabInfo, setInfo] = React.useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/tabs/' + id)
        .then(response => response.json())
        .then(data => {
            setInfo(data);
        });
        
    },[id]);

    function genPlayer(){
        if(tabInfo === null){
            return(<></>);
        }
        if(tabInfo.Error){
            const Error = styled.div`
                margin-top:150px;
            `;
            return(<Error>
                <h1>Error</h1>
                <span>Could not load the tablature. Please try again later.	(｡•́︿•̀｡)</span>
            </Error>);
        }
        return(            
            <>
                <PlayerInfo data={tabInfo}/>
                <MeasureContainer>
                    <MeasureEnd/>
                        {
                        [...Array(tabInfo.measures),].map((val,i) => (
                            <Measure count={tabInfo.measures - i} key={i} data={tabInfo}/>
                        ))            
                        }
                    <MeasureBase/>    
                </MeasureContainer>
            </>

        );
    }


    return(
        <>
            {genPlayer()}
        </>
    );

}

export default KTabsPlayer;
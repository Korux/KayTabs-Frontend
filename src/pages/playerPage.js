import React, { useEffect, Fragment } from 'react';
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

    const [playLine, setPlayLine] = React.useState([0,0]);
    const [playInterval, setPlayInterval] = React.useState(null);


    useEffect(() => {
        if(tabInfo === null) return;
        if(tabInfo.measures === playLine[0] && playLine[1] === 4) {
            clearInterval(playInterval);
            setTimeout(() => setPlayLine([0,0]), 60000 / tabInfo.bpm);
        }
    }, [playLine, playInterval, tabInfo]);

    useEffect(() => {
        fetch('http://localhost:3000/tabs/' + id)
        .then(response => response.json())
        .then(data => {
            setInfo(data);
        });
        
    },[id]);

    function playTablature(){

        setPlayLine([1,1]);

        var play = setInterval(() => {
            setPlayLine(l => l[1] === 4 ? [l[0] + 1, 1] : [l[0],l[1]+1]);
        }, 60000 / tabInfo.bpm);

        setPlayInterval(play);
    }

    function genPlayer(){
        if(tabInfo === null){
            return(<Fragment></Fragment>);
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
            <Fragment>
                <PlayerInfo data={tabInfo} onPlay = {playTablature}/>
                <MeasureContainer>
                    <MeasureEnd/>
                        {
                        [...Array(tabInfo.measures),].map((val,i) => (
                            <Measure count={tabInfo.measures - i} key={i} data={tabInfo} active={playLine}/>
                        ))            
                        }
                    <MeasureBase/>    
                </MeasureContainer>
            </Fragment>

        );
    }


    return(
        <Fragment>
            {genPlayer()}
        </Fragment>
    );

}

export default KTabsPlayer;
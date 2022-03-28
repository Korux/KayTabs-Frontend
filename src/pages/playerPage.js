import React, { useEffect, Fragment } from 'react';
import {  useParams } from 'react-router-dom';
import styled from 'styled-components';

import Measure from '../components/measure';
import MeasureBase from '../components/measurebase';
import MeasureEnd from '../components/measureend';

import PlayerInfo from '../components/playerinfo';

import Loading from 'react-loading';

import globalVars from '../global';

const MeasureContainer = styled.div`
    padding-top:100px;
    height : auto;
    width : fit-content;
    background-color:${({theme}) => theme.primaryDark};
    margin:0 100px;
`;

const TabsLoading = styled(Loading)`
    margin : 150px auto;
`;

function KTabsPlayer(){
    const { id } = useParams();
    const [tabInfo, setInfo] = React.useState(null);

    const [playLine, setPlayLine] = React.useState([0,0]);
    
    const [playing, setPlaying] = React.useState(false);

    useEffect(() => {
        let mounted = true;
        if(playLine[0] > 0 && mounted){
            var currStanza = playLine.slice();
            var currLine = playLine[1][playLine[1].length - 1];
            var nextLine = currLine === 4 ? [playLine[0] + 1, 1] : [playLine[0], currLine + 1];
            var nextNoteType;
            if(nextLine[0] > tabInfo.measures){
                nextLine = [0,0];
                nextNoteType = 0;
            }else{
                nextNoteType = tabInfo.notes[nextLine[0] - 1][4 - nextLine[1]];
                nextNoteType = Math.max.apply(null, nextNoteType);
                while(nextNoteType === 0){
                    nextLine = nextLine[1] === 4 ? [nextLine[0] + 1, 1] : [nextLine[0], nextLine[1] + 1];
                    if(nextLine[0] > tabInfo.measures){
                        nextLine = [0,0];
                        nextNoteType = 0;
                        break;
                    }
                    nextNoteType = tabInfo.notes[nextLine[0] - 1][4 - nextLine[1]];
                    nextNoteType = Math.max.apply(null, nextNoteType);
                }
            }

            var newLine;
            switch(nextNoteType){
                case 1:
                    newLine = [nextLine[0], [nextLine[1]]];
                    break;
                case 2:
                    newLine = [nextLine[0], [nextLine[1], nextLine[1] + 1]];
                    break;
                case 4:
                    newLine = [nextLine[0], [nextLine[1], nextLine[1] + 1, nextLine[1] + 2, nextLine[1] + 3]];
                    break;
                default:
                    newLine = [nextLine[0], [nextLine[1]]];
                    break;
            }

            var Time = 60000 * currStanza[1].length / tabInfo.bpm;
            if(nextNoteType === 8){
                Time = Time / 2;
            }else if(nextNoteType === 16){
                Time = Time / 4;
            }

            setTimeout(() => {
                setPlayLine(newLine);
            }, Time);
        }else{
            setPlaying(false);
        }

        return () =>{mounted = false;};

    },[playLine]);


    useEffect(() => {
        let mounted = true;
        fetch(globalVars.server + '/tabs/' + id)
        .then(response => response.json())
        .then(data => {
            if(mounted)setInfo(data);
        });

        return () =>{mounted = false;};
        
    },[id]);

    function playTablature(){
        setPlaying(true);
        if(tabInfo.notes[0][3].includes(1)){
            setPlayLine([1,[1]]);
        }
        else if(tabInfo.notes[0][3].includes(2)){
            setPlayLine([1,[1,2]]);
        }
        else if(tabInfo.notes[0][3].includes(4)){
            setPlayLine([1,[1,2,3,4]]);
        }
    }

    function genPlayer(){
        if(tabInfo === null){
            return(<TabsLoading type={'spin'} color={'#DDDDDD'} height={'10%'} width={'10%'} />);
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
                <PlayerInfo playing={playing} data={tabInfo} onPlay = {playTablature}/>
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
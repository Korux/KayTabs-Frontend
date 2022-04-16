import React, { useEffect, Fragment, useRef } from 'react';
import {  useParams } from 'react-router-dom';
import styled from 'styled-components';

import Measure from '../components/measure';
import MeasureBase from '../components/measurebase';
import MeasureEnd from '../components/measureend';

import PlayerInfo from '../components/playerinfo';

import Loading from 'react-loading';

import globalVars from '../global';


import MIDISounds from 'midi-sounds-react';

const MeasureContainer = styled.div`
    padding-top:100px;
    height : auto;
    width : fit-content;
    background-color:${({theme}) => theme.primaryDark};
    margin:0 100px;
`;

const MidiHiddenDiv = styled.div`
    height : 0px;
    display : none;
`;


const TabsLoading = styled(Loading)`
    margin : 150px auto;
`;

function KTabsPlayer(){
    const { id } = useParams();
    const [tabInfo, setInfo] = React.useState(null);

    const [playLine, setPlayLine] = React.useState([0,0]);
    
    const [playing, setPlaying] = React.useState(false);

    
    const MIDIPitches = [86,83,79,76,72,69,65,62,60,64,67,71,74,77,81,84,88];
    const MIDIRef = useRef(null);


    useEffect(() => {
        let mounted = true;
        if(playLine[0] > 0 && mounted){
            playLine[2].length > 1 ? MIDIRef.current.playStrumDownNow(1158, playLine[2], 0.25) : MIDIRef.current.playChordNow(1158, playLine[2], 0.25);
            var currLine = playLine[1][playLine[1].length - 1];
            var currNoteType = tabInfo.notes[playLine[0] - 1][4 - playLine[1][0]];
            currNoteType = Math.max.apply(null, currNoteType);
            var nextLine = currLine === 4 ? [playLine[0] + 1, 1] : [playLine[0], currLine + 1];
            var nextNoteType;
            var kalimbaNotes = [];
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

            if(tabInfo.notes[nextLine[0] - 1])kalimbaNotes = tabInfo.notes[nextLine[0] - 1][4 - nextLine[1]].map((x,i) => x > 0 ? MIDIPitches[i] : 0).filter(x => x > 0);

            var newLine;
            switch(nextNoteType){
                case 1:
                    newLine = [nextLine[0], [nextLine[1]], kalimbaNotes];
                    break;
                case 2:
                    newLine = [nextLine[0], [nextLine[1], nextLine[1] + 1], kalimbaNotes];
                    break;
                case 4:
                    newLine = [nextLine[0], [nextLine[1], nextLine[1] + 1, nextLine[1] + 2, nextLine[1] + 3],kalimbaNotes];
                    break;
                default:
                    newLine = [nextLine[0], [nextLine[1]], kalimbaNotes];
                    break;
            }

            var Time = 60000 * playLine[1].length / tabInfo.bpm;
            if(currNoteType === 8){
                Time = Time / 2;
            }else if(currNoteType === 16){
                Time = Time / 4;
            }

            setTimeout(() => {
                setPlayLine(newLine);
            }, Time);
        }else{
            setPlaying(false);
        }
        return () => {mounted = false;};
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
            setPlayLine([1,[1],tabInfo.notes[0][3].map((x,i) => x > 0 ? MIDIPitches[i] : 0).filter(x => x > 0)]);
        }
        else if(tabInfo.notes[0][3].includes(2)){
            setPlayLine([1,[1,2],tabInfo.notes[0][3].map((x,i) => x > 0 ? MIDIPitches[i] : 0).filter(x => x > 0)]);
        }
        else if(tabInfo.notes[0][3].includes(4)){
            setPlayLine([1,[1,2,3,4], tabInfo.notes[0][3].map((x,i) => x > 0 ? MIDIPitches[i] : 0).filter(x => x > 0)]);
        }
        else if(tabInfo.notes[0][3].includes(8)){
            setPlayLine([1,[1], tabInfo.notes[0][3].map((x,i) => x > 0 ? MIDIPitches[i] : 0).filter(x => x > 0)]);
        }
        else if(tabInfo.notes[0][3].includes(16)){
            setPlayLine([1,[1], tabInfo.notes[0][3].map((x,i) => x > 0 ? MIDIPitches[i] : 0).filter(x => x > 0)]);
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
                <MidiHiddenDiv>
                <MIDISounds
                ref={MIDIRef} 
                appElementName="root" instruments={[1158]} 
                />
                </MidiHiddenDiv>
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
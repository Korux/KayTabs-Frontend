import React, { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import Measure from '../components/measure';
import MeasureBase from '../components/measurebase';
import MeasureEnd from '../components/measureend';
import ToolBar from '../components/toolbar';

import { getUserLoggedIn, getUserCreds } from '../redux/selectors';
import { useSelector } from 'react-redux';
import {SuccessToast, ErrorToast } from '../components/toast';

import EditorSideButtons from '../components/editorsidebuttons';

import globalVars from '../global';

const MeasureContainer = styled.div`
    padding-top:100px;
    height : auto;
    width : fit-content;
    background-color:${({theme}) => theme.primaryDark};
    margin:0 auto;
`;

const initTabState = {
    measures : 3,
    notes : [
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
    ]
}

function KTabsEditor(){

    const [tabData, setTabData] = React.useState(initTabState);
    const [title, setTitle] = React.useState("");

    /*
        1 = quarter
        2 = half
        4 = whole
        8 = eighth
        16 = sixteenth
    */

    const [selectedNote, setSelectedNote] = React.useState(1);
    const [selectedMode, setSelectedMode] = React.useState("plus");

    const [toast, setToast] = React.useState('none');
    const [toastMsg, setToastMsg] = React.useState('');

    const [BPM, setBPM] = React.useState(180);

    const [playLine, setPlayLine] = React.useState([0,[0]]);

    const loggedIn = useSelector(getUserLoggedIn);
    const userCreds = useSelector(getUserCreds);

    useEffect(() => {
        if(playLine[0] > 0){
            var currStanza = playLine.slice();
            var currLine = playLine[1][playLine[1].length - 1];
            var nextLine = currLine === 4 ? [playLine[0] + 1, 1] : [playLine[0], currLine + 1];
            var nextNoteType;
            if(nextLine[0] > tabData.measures){
                nextLine = [0,0];
                nextNoteType = 0;
            }else{
                nextNoteType = tabData.notes[nextLine[0] - 1][4 - nextLine[1]];
                nextNoteType = Math.max.apply(null, nextNoteType);
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

            var Time = 60000 * currStanza[1].length / BPM;
            if(nextNoteType === 8){
                Time = Time / 2;
            }else if(nextNoteType === 16){
                Time = Time / 4;
            }

            setTimeout(() => {
                setPlayLine(newLine);
            }, Time);
        }
    },[playLine]);

    useEffect(() => {
        var stanza = tabData.notes[playLine[0] - 1];
        if(stanza !== undefined){
            var line = stanza[4 - playLine[1]];
            if(line !== undefined){
                //var notes = [];
                //play notes here
            }
        }
    }, [playLine, tabData]);

    function addMeasure(){
        let newData = tabData.notes.slice();
        newData.push([
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]);
        setTabData({measures : tabData.measures + 1, notes : newData});
    }

    function removeMeasure(){
        if(tabData.measures === 3){
            return;
        }else{
            let newData = tabData.notes.slice();
            newData.pop();
            setTabData({measures : tabData.measures - 1, notes : newData});
        }
    }

    function clearMeasure(){
        setTabData({measures : 3,
        notes : [
            [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ],
            [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ],
            [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ],
        ]});
    }

    function saveTablature(){
        if(tabData.notes.every(item => item.every(row => row.every(note => note === 0)))){
            setToast('err');
            setToastMsg('No notes have been placed!');
        }else if(title === ""){
            setToast('err');
            setToastMsg('Song title is empty!');
        }else if(!loggedIn){
            setToast('err');
            setToastMsg('You are not logged in!');
        }
        else{
            let reqData = {
                measures : tabData.measures,
                notes : tabData.notes,
                title : title,
                owner : userCreds.id,
                ownername : userCreds.name,
                bpm : 80,
                length : ((tabData.measures * 4) / 80) * 60,
                image : "https://i.ibb.co/v1zFkYx/chrome-to-Mgt0-SVds.png"
            };
            let reqOpts = {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(reqData),
            };

            let reqPutOpts = {
                method : 'PUT',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({type:"tab"}),
            }

            fetch( globalVars.server + '/tabs', reqOpts)
            .then(response => response.json())
            .then(data => {
                if(!data.Error){
                    fetch(globalVars.server + '/users/' + userCreds.id + '/tabs/' + data.id, reqPutOpts)
                    .then(response => response.json())
                    .then(data => {
                        if(!data.Error){
                            setToast('succ');
                            setToastMsg('Song successfully saved!');
                        }else{
                            setToast('err');
                            setToastMsg('Error saving song, please try again.');
                        }
                    });
                }else{
                    setToast('err');
                    setToastMsg('Error saving song, please try again.');
                }
            });
        }
    }

    function validateAndSetBPM(newBPM){
        newBPM = parseInt(newBPM, 10);
        if(newBPM > 999) newBPM = 999;
        if(newBPM < 0) newBPM = 0;
        if(isNaN(newBPM)){
            setBPM('');
            return;
        }
        setBPM(newBPM);
    }

    function playTablature(){
        if(isNaN(parseInt(BPM,10))){
            setToast('err');
            setToastMsg("BPM cannot be empty.");
            return;
        }

        if(tabData.notes[0][3].includes(1)){
            setPlayLine([1,[1]]);
        }
        else if(tabData.notes[0][3].includes(2)){
            setPlayLine([1,[1,2]]);
        }
        else if(tabData.notes[0][3].includes(4)){
            setPlayLine([1,[1,2,3,4]]);
        }
    }

    return(
        <Fragment>
            <ErrorToast onClose={() => setToast('none')} show={toast === 'err'} message={toastMsg}/>
            <SuccessToast onClose={() => setToast('none')} show={toast === 'succ'} message={toastMsg}/>
            <ToolBar mode={selectedMode} setMode={setSelectedMode} note={selectedNote} setNote={setSelectedNote} title={title} setTitle={setTitle} bpm={BPM} setBPM={validateAndSetBPM}/>
            <EditorSideButtons onAdd={addMeasure} onRemove={removeMeasure} onClear={clearMeasure} onSave={saveTablature} onPlay={playTablature}/>
            <MeasureContainer>
            <MeasureEnd/>
                {
                [...Array(tabData.measures),].map((val,i) => (
                    <Measure count={tabData.measures - i} key={i} data={tabData} setData={setTabData} mode={selectedMode} type={"edit"} notetype={selectedNote} active={playLine}/>
                ))            
                }
                <MeasureBase/>    
            </MeasureContainer>
        </Fragment>
    );

}

export default KTabsEditor;
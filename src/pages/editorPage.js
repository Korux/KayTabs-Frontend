import React from 'react';
import styled from 'styled-components';
import Measure from '../components/measure';
import MeasureBase from '../components/measurebase';
import MeasureEnd from '../components/measureend';
import ToolBar from '../components/toolbar';

import { getUserLoggedIn, getUserCreds } from '../redux/selectors';
import { useSelector } from 'react-redux';
import {SuccessToast, ErrorToast } from '../components/toast';

import EditorSideButtons from '../components/editorsidebuttons';

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

    const [playLine, setPlayLine] = React.useState([0,0]);

    const loggedIn = useSelector(getUserLoggedIn);
    const userCreds = useSelector(getUserCreds);

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

            fetch('http://localhost:3000/tabs', reqOpts)
            .then(response => response.json())
            .then(data => {
                if(!data.Error){
                    fetch('http://localhost:3000/users/' + userCreds.id + '/tabs/' + data.id, reqPutOpts)
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

    function playTablature(){

        setPlayLine([1,1]);

        setInterval(() => {
            setPlayLine(l => l[1] === 4 ? [l[0] + 1, 1] : [l[0],l[1]+1]);
        }, 1000);
    }

    return(
        <>
            <ErrorToast onClose={() => setToast('none')} show={toast === 'err'} message={toastMsg}/>
            <SuccessToast onClose={() => setToast('none')} show={toast === 'succ'} message={toastMsg}/>
            <ToolBar mode={selectedMode} setMode={setSelectedMode} note={selectedNote} setNote={setSelectedNote} title={title} setTitle={setTitle}/>
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
        </>
    );

}

export default KTabsEditor;
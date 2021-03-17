import React from 'react';
import styled from 'styled-components';

const MBlock = styled.div`
    width:60px;
    height : 60px;
    background-color: ${({i}) => i % 3 === 0 ? 'rgb(10,85,160)' : 'rgb(160,160,160)'} ;
    border-left:2px solid black ;
    border-right: ${({i}) => i === 17  ? '2px solid black' : '0'} ;
    border-bottom:${({j}) => j === 4 ? '4px solid black' : '0'};
    flex:1;
    pointer-events:${props => props.type === "edit" ? 'auto' : 'none'};

    &:hover{
        background-color: ${({i}) => i % 3 === 0 ? 'rgb(40,145,210)' : 'rgb(220,220,220)'} ;
        cursor : pointer;
    }
`;

const MLine = styled.div`
    display : flex;
    margin: auto;
    width:fit-content;
`;

const MCount = styled.div`
    width:180px;
    height:60px;
    background-color:${({theme}) => theme.primaryDark};
    border:0px;
    color:white;
    font-size:20px;
    pointer-events:none;
    text-align:left !important;
    padding-left:20px;
`;

const MNoteEnd = styled.div`
    width:180px;
    height:60px;
    background-color:${({theme}) => theme.primaryDark};
    border:0px;
    color:black;
    font-size:30px;
    pointer-events:none;
    text-align:top !important;

`;

const MNoteLine = styled.hr`
    border:none;
    height:2px;
    background-color:black;
    margin-top:19px;
    margin-bottom:0;
    margin-left:0;
`;

const MNoteLineHalf = styled(MNoteLine)`
    width:50%;
`;

const MNote = styled.span`
    height: 25px;
    width: 25px;
    background-color: #000;
    border-radius: 50%;
    display: inline-block;
    margin-top:-2px;
`;

function Measure(props){

    function addNote(i,j){
        let newData = props.data.notes.slice();
        newData[props.count-1][j][i] = 1;
        let mCount = props.data.measures;
        props.setData({measures:mCount, notes:newData});
    }

    function removeNote(i,j){
        let newData = props.data.notes.slice();
        newData[props.count-1][j][i] = 0;
        let mCount = props.data.measures;
        props.setData({measures:mCount, notes:newData});
    }

    function genNote(i,j){

        var rightMost = 0;
        var isRightMost = true;
        var hasNote = false;
        var notes = props.data.notes;

        if(notes[props.count-1][j][i] === 1) hasNote = true;
        notes[props.count-1][j].forEach((note,c) => {
            if(note === 1 && c > rightMost)
                rightMost = c;
        });

        isRightMost = i >= rightMost;

        if(isRightMost && hasNote){
            return (<><MNoteLineHalf/><MNote/></>);
        }
        if(!isRightMost && hasNote){
            return (<><MNoteLine/><MNote/></>);
        }
        if(i < rightMost && !hasNote){
            return (<><MNoteLine/></>);
        }
        return(<></>);
    }

    function genNoteEnd(j){
        if(props.data.notes[props.count-1][j].includes(1)){
            return (<><MNoteLine/></>);
        }
        return(<></>); 
    }

    return(
        <>
            {
            [...Array(4),].map((val,j) => (
                <MLine key={j}>
                    <MNoteEnd>{genNoteEnd(j)}</MNoteEnd>
                    {[...Array(17),].map((val,i) => (
                        <MBlock i={i+1} j={j+1} key={i * (j+1)} type={props.type} onClick={ props.mode === "plus" ?  () => addNote(i,j) : () => removeNote(i,j)}>
                            {genNote(i,j)}
                        </MBlock>
                    ))}
                    <MCount j={j+1}><br/>{j+1 === 4 && props.count}</MCount>
                </MLine>    
            ))            
            }
        </>
    );

}

export default Measure;
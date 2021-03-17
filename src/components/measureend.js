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
border-top:10px solid black;
`;

const MNone = styled.div`
    width : 180px;
    height:50px;
    background-color:${({theme}) => theme.primaryDark};
    border:0px;
    pointer-events:none;
`;

const MContainer = styled.div`
    display:flex;
    margin: auto;
    width:fit-content;
`;

const MNoteEndLine = styled.hr`
    border:none;
    height:5px;
    background-color:black;
    margin-top:10px;
    margin-bottom:0;
    margin-left:0;
`;


function MeasureEnd(){
    return(
        <>
            <MContainer>
                <MNone/>
                {[...Array(17),].map((val,i) => (
                    <MBlock i={i + 1} key={i}><MNoteEndLine/></MBlock>
                ))}
                <MNone/>

            </MContainer>
        </>
    );

}

export default MeasureEnd;
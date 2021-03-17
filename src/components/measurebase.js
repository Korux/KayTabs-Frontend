import React from 'react';
import styled from 'styled-components';

const MBlock = styled.div`
    width : 60px;
    height : 130px;
    background-color: ${({i}) => i % 3 === 0 ? 'rgb(60,145,220)' : 'rgb(240,240,240)'} ;
    border-left:2px solid black ;
    border-right: ${({i}) => i === 17  ? '2px solid black' : '0'} ;
    border-bottom : 2px solid black;
    flex:1;
    color:black;
    font-size:1.25rem;
    font-weight:650;
    line-height:10px;

`;

const MNone = styled.div`
    width : 180px;
    height:130px;
    background-color:${({theme}) => theme.primaryDark};
    border:0px;
    pointer-events:none;
`;

const MContainer = styled.div`
    display:flex;
    margin: auto;
    width:fit-content;
`;

function MeasureBase(){

    const notes = ['D6','B5','G5','E5','C5','A4','F4','D4','C4','E4','G4','B4','D5','F5','A5','C6','E6'];
    const nums = [2,7,5,3,1,6,4,2,1,3,5,7,2,4,6,1,3];
    const dots = [':','.','.','.','.','','','','','','','','.','.','.',':',':'];

    return(
        <>
            <MContainer>
                <MNone/>
                {[...Array(17),].map((val,i) => (
                    <MBlock i={i + 1} key={i}><br/><br/>{notes[i]}<br/><br/><br/>{dots[i]}<br/><br/>{nums[i]}</MBlock>
                ))}
                <MNone/>

            </MContainer>
        </>
    );

}

export default MeasureBase;
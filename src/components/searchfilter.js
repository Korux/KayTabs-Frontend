import React, { Fragment } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = styled.input`
    float:left;
    width:90%;
    height:90%;
    border:none;
    border-top-left-radius:25px;
    border-bottom-left-radius:25px;
    background-color:${({theme}) => theme.primaryDark};
    margin:0 auto;
    padding:0 10px;
    font-size:20px;
    color:rgb(180,180,180);
    transition : all 0.2s ease-in-out;
    &:focus{
        outline:none;
        color:rgb(220,220,220);
        
    }
    
`;

const Container = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    width : 60%;
    height : 50px; 
    margin: 0 auto;
    margin-top:80px;
    border:1px solid gray;
    border-radius:25px;
    transition : all 0.2s ease-in-out;
    &:focus-within{
        outline:none;
        color:rgb(220,220,220);
        border:1px solid rgb(220,220,220);
    }
`;


const SearchButton = styled.button`
    width:5%;
    height:100%;
    border:none;
    border-top-right-radius:25px;
    border-bottom-right-radius:25px;
    background-color:${({theme}) => theme.primaryDark};
    margin:0 auto;
    text-align:right!important;
`;

const SearchIcon = styled(FontAwesomeIcon)`
    color:white;
    transition: all 0.2s linear;
    &:hover{
        color:rgb(120,120,200);
    }
`;

function SearchFilter(props){

    const [query, setQuery] = React.useState("");

    function handleSubmit(event){
        event.preventDefault();
        props.onSearch(query);
    }

    return(
        <Fragment>
            <Container onSubmit={handleSubmit}>
                
                <Search placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
                <SearchButton>
                    <SearchIcon size={"lg"}icon={faSearch}/>
                </SearchButton>
               

            </Container>
        </Fragment>
    );

}

export default SearchFilter;
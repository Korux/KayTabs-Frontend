import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { getUserLoggedIn, getUserCreds } from '../redux/selectors';
import { userLogin, userLogout } from '../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faListUl, faUser } from '@fortawesome/free-solid-svg-icons';

import { ErrorToast } from './toast';

import { useAuth0 } from "@auth0/auth0-react";
import globalVars from '../global';

const StyledDim = styled.a`
    display: inline-block;
    opacity :  ${props => props.open ? '0.5' : '0'};
    pointer-events :  ${props => props.open ? 'auto' : 'none'};
    transition: opacity 0.3s ease-in-out;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 997;
    top: 0;
    left: 0;
`;

const StyledMenu = styled.nav`
    color: ${({ theme }) => theme.secondaryDark};
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.secondaryLight};
    -webkit-transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    -moz-transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    -o-transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    -ms-transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    height: 100vh;
    width: max(320px,15vw);
    text-align: left;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index:998;
    -webkit-transition: -webkit-transform 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out;
    -ms-transition: -ms-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out;

    img {
        border-radius : 50%;
        background-color:white;
        margin : 0 auto;
        margin-top:80px;
        object-fit : cover;
        width : 10rem;
        height : 10rem;
    }

`;

const UserName = styled.div`
    color: ${({ theme }) => theme.secondaryDark};
    text-decoration: none;
    font-size: 2.2rem;
    font-weight: 600;
    margin : 0 auto;
`;

const LRLink = styled.span`
    color: ${({ theme }) => theme.secondaryDark};
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    margin : 110px 10px;

    &:hover{
        cursor: pointer;
        color: ${({ theme }) => theme.primaryHover};
    }
`;

const HR = styled.hr`
    border: 0;
    clear:both;
    display:block;
    width: 96%;               
    background-color:#000000;
    height: 1px;
`;


const IconContainer = styled.div`
width:60px;
float:left;
`;

const FaIcon = styled(FontAwesomeIcon)`
    margin : 0.2rem 2rem 0.2rem 0;
`;

const StyledLink = styled(Link)`
    font-size: 1.2rem;
    padding: 0.3rem 0;
    font-weight: bold;
    letter-spacing: 0.03rem;
    color: ${({ theme }) => theme.secondaryDark};
    text-decoration: none;
    transition: color 0.3s linear;



    &:hover {
        color: ${({ theme }) => theme.primaryHover};
        text-decoration: none;
    }
`;

const StyledLinkProfile = styled(StyledLink)`
    pointer-events: ${props => props.logged ? 'auto' : 'none'};
    color: ${({ logged, theme }) => logged ? theme.secondaryDark : theme.disabled};
`;

const LinkContainer = styled.div`
    width:400px;
`;

const LinkText = styled.span`
float:left;
    margin-left:10px;
`;

function Menu({open, setOpen}){

    var loggedIn = useSelector(getUserLoggedIn);
    var userCreds = useSelector(getUserCreds);

    const [error, setError] = React.useState(false);
    const [errorMsg, setErrMsg] = React.useState('');

    const { loginWithRedirect, logout } = useAuth0();
    const { user, isAuthenticated } = useAuth0();

    const dispatch = useDispatch();

    useEffect(() => {
        if(isAuthenticated && user){
            fetch(globalVars.server + '/users?email=' + user.email)
            .then(response => response.json())
            .then(data => {
                if(!data.Error){
                    let loginAction = userLogin(data);
                    dispatch(loginAction);
                }else{
                    setErrMsg(data.Error);
                    setError(true);
                }
            });
        }else{
            let logoutAction = userLogout();
            dispatch(logoutAction);
        }
    },[ isAuthenticated, user]);
    
    return(
        <Fragment>
            <ErrorToast onClose={() => setError(false)} show={error} message={errorMsg}/>
            <StyledDim key={"key01693"} open={open} onClick={() => setOpen(false)}/>
            <StyledMenu open={open}>

            <div>
                <img src={userCreds.image} alt="pfp"/>
                <UserName>{userCreds.name}</UserName>
                <div>
                    {loggedIn ? 
                        
                        <LRLink onClick={() => logout({returnTo: globalVars.url})}>Logout</LRLink>
                        
                        : 
                        
                        <Fragment>
                            <LRLink onClick={() => loginWithRedirect()}>Login</LRLink>|<LRLink onClick={() => loginWithRedirect({screen_hint:"signup"})}>Register</LRLink> 
                        </Fragment>
                        
                    }
                </div>
            </div> 
            


            
            <HR/>

            <StyledLink to="/editor" onClick={() => {setOpen(false); window.scrollTo(0,document.body.scrollHeight)}}>
                <LinkContainer>
                    <IconContainer>
                        <FaIcon size={"lg"} icon={faEdit}/>
                    </IconContainer>

                    <LinkText>Editor</LinkText>
                </LinkContainer>
            </StyledLink>

            <StyledLink to="/tabs" onClick={() => {setOpen(false); window.scrollTo(0,0)}}>
                <LinkContainer>
                    <IconContainer>
                        <FaIcon size={"lg"} icon={faListUl}/>
                    </IconContainer>

                    <LinkText>View Tabs</LinkText>
                </LinkContainer>
            </StyledLink>

            <StyledLinkProfile logged={loggedIn ? 1 : 0} to={"/profile/" + userCreds.id} onClick={() => {setOpen(false); window.scrollTo(0,0)}} >
                <LinkContainer>
                <IconContainer>
                <FaIcon size={"lg"} icon={faUser}/>
                </IconContainer>

                <LinkText>My Profile</LinkText>
                </LinkContainer>
            </StyledLinkProfile>

            </StyledMenu>
        </Fragment>
    );
}

export default Menu;
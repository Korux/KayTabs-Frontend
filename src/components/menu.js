import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { getUserLoggedIn, getUserCreds } from '../redux/selectors';
import { userLogin, userLogout, userRegister } from '../redux/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faListUl, faUser } from '@fortawesome/free-solid-svg-icons';

import { Form, Button } from 'react-bootstrap';

import { ErrorToast } from './toast';

const StyledLRTitle = styled.span`
    font-size:20px;
    font-weight:650;
    margin:40px 0 20px 0;
`;

const StyledButton = styled(Button)`
    border-radius : 10% !important;
    margin: 0 auto !important;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

function InputForm(props){

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event){
        event.preventDefault();
        props.onSubmit(email,password);
    }
    return(
        <>
            <StyledLRTitle>{props.LogReg}</StyledLRTitle>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <ButtonContainer>
                    <StyledButton variant="primary" type="submit" disabled={!validateForm()}>
                        {props.LogReg}
                    </StyledButton>
                    <StyledButton variant="primary" onClick={props.onCancel}>
                        Cancel
                    </StyledButton>
                </ButtonContainer>
            </Form>
        </>
    );

}


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

const UserName = styled.span`
    color: ${({ theme }) => theme.secondaryDark};
    text-decoration: none;
    font-size: 2.5rem;
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

    const [LogReg, setLogReg] = React.useState('none');

    const [error, setError] = React.useState(false);
    const [errorMsg, setErrMsg] = React.useState('');

    const dispatch = useDispatch();

    function userLR(email,password){
        let creds = {
            'email' : email,
            'password' : password,
        }
        if(LogReg === "Login"){

            fetch('http://localhost:3000/users?email=' + creds.email)
            .then(response => response.json())
            .then(data => {
                if(!data.Error){
                    if(data.password !== creds.password){
                        setErrMsg("Password is incorrect.");
                        setError(true);
                    }else{
                        let loginAction = userLogin(data);
                        dispatch(loginAction);
                    }
                }else{
                    setErrMsg(data.Error);
                    setError(true);
                }
            });
        }else if(LogReg === "Register"){

            let reqData = {
                email : creds.email,
                password : creds.password,
                name : creds.email.split("@")[0],
                description : "Hello",
                image : "https://cdn0.iconfinder.com/data/icons/online-shop-equitment-gliph/32/line-2_on_going_logo-02-512.png",
                tabs : [],
                starred : [],
            }

            let reqOpts = {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(reqData),
            }

            fetch('http://localhost:3000/users', reqOpts)
            .then(response => response.json())
            .then(data => {
                if(!data.Error){
                    let registerAction = userRegister({...reqData, id : data.id});
                    dispatch(registerAction);
                }else{
                    setErrMsg(data.Error);
                    setError(true);
                }
            });
        }
        setLogReg('none');
    }

    function userLout(){
        setLogReg('none');
        let logoutAction = userLogout();
        dispatch(logoutAction);
    }


    
    return(
        <>
            <ErrorToast onClose={() => setError(false)} show={error} message={errorMsg}/>
            <StyledDim key={"key01693"} open={open} onClick={() => setOpen(false)}/>
            <StyledMenu open={open}>
            {
                LogReg === 'none' ? 
                <>
                    <img src={userCreds.image} alt="pfp"/>
                    <UserName>{userCreds.name}</UserName>
                    <div>
                        {loggedIn ? 
                            <>
                            <LRLink onClick={userLout}>Logout</LRLink>
                            </> 
                            : 
                            <>
                            <LRLink onClick={() => setLogReg('Login')}>Login</LRLink>|<LRLink onClick={() => setLogReg('Register')}>Register</LRLink> 
                            </>
                        }
                    </div>
                </> 
                : 
                <>
                    <InputForm onSubmit={userLR} onCancel={() => setLogReg('none')} LogReg={LogReg}/>
                </>
            }

            
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

            <StyledLinkProfile logged={loggedIn} to={"/profile/" + userCreds.id} onClick={() => {setOpen(false); window.scrollTo(0,0)}} >
                <LinkContainer>
                <IconContainer>
                <FaIcon size={"lg"} icon={faUser}/>
                </IconContainer>

                <LinkText>My Profile</LinkText>
                </LinkContainer>
            </StyledLinkProfile>

            </StyledMenu>
        </>
    );
}

export default Menu;
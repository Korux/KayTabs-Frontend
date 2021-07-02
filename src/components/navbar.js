import React from 'react'
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../images/logo.png';

import { faFacebook, faDiscord, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import Burger from './burger';
import Menu from './menu';

const NavColumn = styled.div`
    flex:1;
`;

const StyledBrand = styled(Navbar.Brand)`
    text-align : center;
    margin : 0 auto;
    align : center;

    img{
        
        height:45px;
    }
`;

const StyledNavbar = styled(Navbar)`
    display:flex;
    background-color:${({ theme }) => theme.navbar};
`;

const FaLink = styled.a`
    &:hover {
        cursor : pointer;
    }
`;

const FaIcon = styled(FontAwesomeIcon)`
    color:gray;
    margin:0px 10px;

    &:hover{
        color:rgb(180,180,180)
    }

`;

const LinkContainer = styled.div`
    text-align:right !important;
`;

function NavBar(){
    const [menuOpen, setMenuOpen] = React.useState(false);

    return(
        
        <StyledNavbar variant="dark" fixed="top">
            <NavColumn>
            <Burger open={menuOpen} setOpen={setMenuOpen}/>
            <Menu open={menuOpen} setOpen={setMenuOpen}/>
            </NavColumn>

            <NavColumn>
            <StyledBrand><img src={Logo} alt="logo"/></StyledBrand>
            </NavColumn>

            <NavColumn>
                <LinkContainer>
                    <FaLink href="https://facebook.com">
                    <FaIcon size={"lg"} icon={faFacebook}/>
                    </FaLink>
                    <FaLink href="https://discord.com">
                        <FaIcon size={"lg"} icon={faDiscord}/>
                    </FaLink>
                    <FaLink href="https://twitter.com">
                        <FaIcon size={"lg"} icon={faTwitter}/>
                    </FaLink>
                    <FaLink href="http://github.com">
                        <FaIcon size={"lg"} icon={faGithub}/>
                    </FaLink>
                </LinkContainer>
            </NavColumn>



        </StyledNavbar>

        
    );

}

export default NavBar;
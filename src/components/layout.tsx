import {Link, Outlet, useNavigate} from "react-router-dom"
import styled from "styled-components";
import {auth} from "../firebase";
import Header from "./Header";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 100vh;
    overflow: hidden;
`

const Menu = styled.div`
    position: absolute;
    bottom: 0;
    height: 60px;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    border-top: 1px solid #BFBFBF;
    background: #fff;
`

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 5px;
    cursor: pointer;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    transition: all 0.3s;
    svg {
        transition: all 0.3s;
        width: 30px;
    }
    &.home {
        left: 15%;
    }
    &.profile {
        left: calc(50% - 25px);
    }
    &.log-out {
        right: 15%;
    }
    &:hover {
        bottom: 30px;
        background: #1d9bf0;
        svg {
            width: 33px;
            stroke: #fff;
        }
        .menu-name{
            font-size: 14px;
            bottom: -18px;
            color: #1d9bf0;
            font-weight: 600;
        }
    }
`

const MenuName = styled.span`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0;
    color: #fff;
`

export default function Layout(){
    const navigate = useNavigate()
    const onLogout = async () => {
        const ok = confirm("Are you sure you want to log out?")
        if(ok){
            await auth.signOut()
            navigate('/login')
        }
    }
    return(
        <Wrapper>
            <Header />
            <Outlet/>
            <Menu>
                <Link to="/">
                    <MenuItem className="home">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#404040" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                        </svg>
                        <MenuName className="menu-name">Home</MenuName>
                    </MenuItem>
                </Link>
                <Link to="/Profile">
                    <MenuItem className="profile">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#404040" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                        </svg>
                        <MenuName className="menu-name">Profile</MenuName>
                    </MenuItem>
                </Link>
                <MenuItem onClick={onLogout} className="log-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#404040" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/>
                    </svg>
                    <MenuName className="menu-name">Logout</MenuName>
                </MenuItem>
            </Menu>
            {/* router를 활용해서 layout 밑에 자식들이 여기로 들어옴 */}
        </Wrapper>
    )
}
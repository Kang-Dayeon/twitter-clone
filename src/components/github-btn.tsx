import styled from "styled-components";
import {GithubAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom"

const Button = styled.span`
    margin-top: 50px;
    background-color: white;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    color: black;
    width: 100%;
    cursor: pointer;
    border: 1px solid #BFBFBF;
    &:hover {
        background: #BFBFBF;
        color: #fff;
        border: none;
    }
`

const Logo = styled.img`
    height: 25px;
`

export default function GithubBtn(){
    const navigate = useNavigate()
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider()
            await signInWithPopup(auth, provider)
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg" />
            Continue with Github
        </Button>
    )
}
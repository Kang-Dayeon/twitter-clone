import styled from "styled-components";

export const Wrapper = styled .div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`

export const Title = styled.h1`
    font-size: 22px;
    font-weight: 600;
`

export const Form = styled.form`
    margin-bottom: 10px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

export const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 14px;
    border: 1px solid #BFBFBF;
    &[type="submit"]{
        cursor: pointer;
        font-weight: 600;
        color: #fff;
        background-color: #1d9bf0;
        border: none;
        &:hover {
            opacity: 0.8;
        }
    }
`

export const Error = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: tomato;
`

export const Switcher = styled.span`
    margin-top: 15px;
    a {
        color: #1d9bf0;
    }
`
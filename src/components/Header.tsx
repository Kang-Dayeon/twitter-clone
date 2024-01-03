import styled from "styled-components";

const Title = styled.h1`
    position: sticky;
    top: 0;
    padding: 15px 0;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    background: #fff;
`

export default function Header(){
    return(
        <Title>Tweet</Title>
    )
}
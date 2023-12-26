import {ITweet} from "./timeline";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
`

const Column = styled.div``

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`

const Payload = styled.p`
    margin: 10px 0;
    font-size: 18px;
`

const Photo = styled.img`
    width: 100%;
    border-radius: 15px;
`

export default function Tweet({username, photo, tweet}:ITweet){
    return(
        <Wrapper>
            {photo ? <Column><Photo src={photo}/></Column> : null}
            <Column>
                <Username>{username}</Username>
                <Payload>{tweet}</Payload>
            </Column>
        </Wrapper>
    )
}
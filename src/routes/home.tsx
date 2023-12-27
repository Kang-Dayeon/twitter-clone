import PostTweetForm from "../components/post-tweet-form";
import styled from "styled-components";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    display: grid;
    padding: 0 30px 80px;
    gap: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    grid-template-rows: 1fr 5fr;
    height: 100%;
    &::-webkit-scrollbar {
        display: none;
    }
`

export default function Home(){

    return(
        <Wrapper>
            <PostTweetForm />
            <Timeline />
        </Wrapper>
    )
}
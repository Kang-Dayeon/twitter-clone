import PostTweetForm from "../components/post-tweet-form";
import styled from "styled-components";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    display: grid;
    margin-top: 10px;
    padding: 0 30px 80px;
    overflow-y: scroll;
    overflow-x: hidden;
    grid-template-rows: 1fr 5fr;
    height: calc(100% - 62px);
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
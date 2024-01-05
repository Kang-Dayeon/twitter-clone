import {ITweet} from "./timeline";
import styled from "styled-components";
import {auth, db, storage} from "../firebase";
import {deleteDoc, doc} from "firebase/firestore";
import {ref, deleteObject} from "firebase/storage";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
    padding: 20px;
    border-top: 1px solid #BFBFBF;
    color: #000;
`

const Column = styled.div``

const Username = styled.h4`
    font-weight: 600;
    font-size: 15px;
`

const Payload = styled.p`
    margin: 15px 0;
    font-size: 18px;
    line-height: 1.3;
`

const Photo = styled.img`
    width: 100%;
    border-radius: 15px;
`

const BtnWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: end;
`

const DeleteButton = styled.button`
    border: 0;
    padding: 5px;
    text-transform: uppercase;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;
    svg{
        width: 20px;
        height: 20px;
    }
    &:hover {
        background: #1d9bf0;
        border-radius: 50%;
        svg{
            stroke: #fff;
        }
    }
`

const EditButton = styled.button`
    margin-left: 5px;
    border: 0;
    cursor: pointer;
    background: transparent;
    a{
        display: block;
        padding: 5px;
        transition: all 0.3s;
        svg{
            width: 20px;
            height: 20px;
        }
        &:hover {
            background: #1d9bf0;
            border-radius: 50%;
            svg{
                stroke: #fff;
            }
        }
    }
`

const Profile = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`

const ProfileImgWrap = styled.div`
    margin-right: 10px;
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    background: #eee;
`

const ProfileImg = styled.img`
    width: 100%;
`

const PostDate = styled.p`
    margin-top: 5px;
    font-size: 12px;
    color: #666;
`

export default function Tweet({username, photo, tweet, userId, id, createdAt, avatar}:ITweet){
    const user = auth.currentUser

    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this tweet?")
        if(!ok || user?.uid !== userId) return
        try {
            await deleteDoc(doc(db, "tweets", id))
            if(photo){
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`)
                await deleteObject(photoRef)
            }
        } catch (e){
            console.log(e)
        }
    }

    return(
        <Wrapper>
            {photo ? <Column><Photo src={photo}/></Column> : null}
            <Column>
                <Profile>
                    <ProfileImgWrap>
                        <ProfileImg src={avatar} />
                    </ProfileImgWrap>
                    <div>
                        <Username>{username}</Username>
                        <PostDate>{createdAt}</PostDate>
                    </div>
                </Profile>

                <Payload>{tweet}</Payload>
                {user?.uid === userId ? <BtnWrapper>
                <DeleteButton onClick={onDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="black" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                    </svg>
                </DeleteButton>
                <EditButton><Link to="/edit-tweet" state={{username, photo, tweet, userId, id}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="black" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                    </svg>
                </Link></EditButton>
                </BtnWrapper> : null}
            </Column>
        </Wrapper>
    )
}
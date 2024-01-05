import {ITweet} from "./timeline";
import styled from "styled-components";
import {auth, db, storage} from "../firebase";
import {deleteDoc, doc} from "firebase/firestore";
import {ref, deleteObject} from "firebase/storage";
import {Link} from "react-router-dom";
import {useEffect} from "react";

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
    background: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`

const EditButton = styled.button`
    margin-left: 10px;
    background: #1d9bf0;
    border: 0;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    a{
        display: block;
        color: white;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        text-decoration: none;
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
                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                <EditButton><Link to="/edit-tweet" state={{username, photo, tweet, userId, id}}>Edit</Link></EditButton>
                </BtnWrapper> : null}
            </Column>
        </Wrapper>
    )
}
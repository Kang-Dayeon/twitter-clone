import {ITweet} from "./timeline";
import styled from "styled-components";
import {auth, db, storage} from "../firebase";
import {deleteDoc, doc} from "firebase/firestore";
import {ref, deleteObject} from "firebase/storage";

const Wrapper = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
`

const Column = styled.div``

const Username = styled.h4`
    margin-top: 15px;
    font-weight: 600;
    font-size: 15px;
`

const Payload = styled.p`
    margin: 10px 0;
    font-size: 20px;
`

const Photo = styled.img`
    width: 100%;
    border-radius: 15px;
`

const DeleteButton = styled.button`
    margin-top: 10px;
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

export default function Tweet({username, photo, tweet, userId, id}:ITweet){
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
                <Username>{username}</Username>
                <Payload>{tweet}</Payload>
                {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
            </Column>
        </Wrapper>
    )
}
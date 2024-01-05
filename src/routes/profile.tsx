import styled from "styled-components";
import {useEffect, useState} from "react";
// ** firebase **
import {auth, db, storage} from "../firebase";
import {query, collection, where, orderBy, limit, doc, updateDoc, onSnapshot, Unsubscribe} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {updateProfile} from "firebase/auth";
import {ITweet} from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    height: calc(100% - 62px);
`

const AvatarWrap = styled.div``

const AvatarUpload = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid #F2F2F2;
    border-radius: 50%;
    background-color: #BFBFBF;
    cursor: pointer;
    svg {
        width: 70px;
    }
`

const AvatarImg = styled.img`
    width: 100%;
`

const AvatarInput = styled.input`
    display: none;
`

const Name = styled.span`
    font-size: 18px;
    font-weight: 600;
`

const Tweets = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    overflow-y: scroll;
    padding: 30px 30px 60px;
    &::-webkit-scrollbar {
        display: none;
    }
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`

const EditName = styled.button`
    padding: 0;
    margin-left: 6px;
    border: none;
    background: transparent;
    width: 15px;
    height: 15px;
    cursor: pointer;
    svg {
        width: 15px;
    }
    &.submit{
    width: 30px;
    height: 30px;
    svg {
        width: 30px;
    }
    }
`

const NameInput = styled.input`
    padding: 7px 15px;
    background: #fff;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    width: 180px;
`

export default function Profile(){
    const user = auth.currentUser

    const [avatar, setAvatar] = useState(user?.photoURL)
    const [tweets, setTweets] = useState<ITweet[]>([])
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(user?.displayName)
    const [tweetId, setTweetId] = useState<string[]>([])

    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target
        if(!user) return

        try{
            if(files && files.length === 1){
                const file = files[0]
                const locationRef = ref(storage,`avatars/${user?.uid}`)
                const result = await uploadBytes(locationRef, file)
                const avatarUrl = await getDownloadURL(result.ref)
                setAvatar(avatarUrl)
                await updateProfile(user, {
                    photoURL: avatarUrl,
                })
            }
        }catch(e){
            console.log(e)
        }
        
    }

    const onClickNameChange = () => {
        setEdit(true)
    }

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const tweetNameChange = async () => {
        try{
            for(let i = 0; i < tweetId.length; i++){
                await updateDoc(doc(db, "tweets", tweetId[i]),{
                    username: name,
                    avatar,
                })
            }
        } catch(e){
            console.log(e)
        }
    }

    const onSubmitName = async () => {
        if(!user) return
        try {
            if(name && name.length <= 0){
                alert("Please write your name")
            } else {
                await updateProfile(user, {
                    displayName: name,
                })
                await tweetNameChange()
                setEdit(false)
            }
        } catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        let unsubscribe : Unsubscribe | null = null
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                where("userId", "==", user?.uid),
                orderBy("createdAt", "desc"),
                limit(25)
            )

            unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    const {tweet, createdAt, userId, username, photo, avatar} = doc.data()
                    return {
                        tweet,
                        avatar,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                    }
                })
                setTweetId(tweets.map((tweet) => {return tweet.id}))
                setTweets(tweets)
            })
        }
        fetchTweets()

        return() => {
            unsubscribe && unsubscribe()
        }
    }, [])

    return(
        <Wrapper>
            <AvatarWrap>
                <AvatarUpload htmlFor="avatar">
                    {Boolean(avatar) ? (<AvatarImg src={avatar}/>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                        </svg>
                    )}
                </AvatarUpload>
                <AvatarInput onChange={onAvatarChange} type="file" accept="image/*" id="avatar" />
            </AvatarWrap>
            {edit ? (
                <UserInfo>
                    <NameInput onChange={onNameChange} type="text" value={name} />
                    <EditName className="submit" onClick={onSubmitName}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#404040" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                    </EditName>
                </UserInfo>
            ) : (
                <UserInfo>
                    <Name>
                        {user?.displayName ?? "Anonymous"}
                    </Name>
                    <EditName onClick={onClickNameChange}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#404040" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                        </svg>
                    </EditName>
                </UserInfo>
            )}
            <Tweets>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} {...tweet} />
                ))}
            </Tweets>
        </Wrapper>
    )
}
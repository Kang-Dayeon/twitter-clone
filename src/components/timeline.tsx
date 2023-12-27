import {useEffect, useState} from "react";
import styled from "styled-components";
import {query, collection, orderBy, getDocs, onSnapshot, Unsubscribe, limit} from "firebase/firestore";
import {db} from "../firebase";
import Tweet from "./tweet";

export interface ITweet{
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div``

export default function Timeline(){
    const [tweets, setTweets] = useState<ITweet[]>([])

    useEffect(() => {
        let unsubscribe : Unsubscribe | null = null
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc"),
                limit(25)
            )

            // const snapshot = await getDocs(tweetsQuery)
            //
            // const tweets = snapshot.docs.map((doc) => {
            //     const {tweet, createdAt, userId, username, photo} = doc.data()
            //     return {
            //         tweet,
            //         createdAt,
            //         userId,
            //         username,
            //         photo,
            //         id: doc.id,
            //     }
            // })

            // 쿼리에 리스너를 붙여준것
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    const {tweet, createdAt, userId, username, photo} = doc.data()
                    return {
                        tweet,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                    }
                })
                setTweets(tweets)
            })
        }
        fetchTweets()

        return () => {
            unsubscribe && unsubscribe()
        }
    },[])
    return(
        <Wrapper>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} {...tweet} />
            ))}
        </Wrapper>
    )
}
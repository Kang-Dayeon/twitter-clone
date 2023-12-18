import styled from "styled-components";
import {useState} from "react";
import {addDoc, collection} from "firebase/firestore"
import {auth, db} from "../firebase";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    &::placeholder {
        font-size: 16px;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
`

const AttachFileButton = styled.label`
    padding: 10px 0;
    color: #1d9bf0;
    text-align: center;
    border: 1px solid #1d9bf0;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`

const AttachFileInput = styled.input`
    display: none;
`

const SubmitBtn = styled.input`
    padding: 10px 0;
    text-align: center;
    border: none;
    background-color: #1d9bf0;
    border-radius: 20px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.8;
    }
`

export default function PostTweetForm(){
    const [isLoading, setIsLoading] = useState(false)
    const [tweet, setTweet] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value)
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target
        if(files && files.length === 1){
            setFile(files[0])
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = auth.currentUser
        if(!user || isLoading || tweet === "" || tweet.length > 180) return

        try {
            setIsLoading(true)
            await addDoc(collection(db, "tweets"), {
                tweet,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid
            })
        } catch (e){
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }
    return(
        <Form onSubmit={onSubmit}>
            <TextArea rows={5} maxLength={180} onChange={onChange} value={tweet} placeholder="What is happening?" />
            <AttachFileButton htmlFor="file">{file? "Photo added ✅" : "Add Photo"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
        </Form>
    )
}
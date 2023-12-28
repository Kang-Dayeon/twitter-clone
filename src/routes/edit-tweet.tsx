import styled from "styled-components";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {updateDoc, doc} from "firebase/firestore";
import {auth, db, storage} from "../firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

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

const Form = styled.form`
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
    background: #17212d;
`
const Column = styled.div``

const Photo = styled.img`
    width: 100%;
    border-radius: 15px;
`

const TextArea = styled.textarea`
    border: 1px solid rgba(255, 255, 255, 0.7);
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background: #17212d;
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

export default function EditTweet(){
    const location = useLocation()
    const navigate = useNavigate()

    const tweetValue = location.state.tweet
    const photo = location.state.photo
    const id = location.state.id

    const [isLoading, setIsLoading] = useState(false)
    const [tweet, setTweet] = useState(tweetValue)
    const [file, setFile] = useState<File | null>(null)
    const [imgSrc, setImgSrc] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value)
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxSize = 1024 * 1024
        const {files} = e.target
        if(files && files.length === 1 && files[0].size < maxSize){
            setFile(files[0])
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onloadend = () => {
                setImgSrc(reader.result)
            }
        } else if(files[0].size > maxSize){
            alert("최대 1MB까지 올릴 수 있습니다.")
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = auth.currentUser
        if(!user || isLoading || tweet === "" || tweet.length > 180) return

        try {
            setIsLoading(true)
            const newDoc = await updateDoc(doc(db, "tweets", id), {
                tweet,
                createdAt: Date.now(),
            })
            if(file){
                const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`)
                const result = await uploadBytes(locationRef, file)
                const url = await getDownloadURL(result.ref)
                await updateDoc(newDoc, {
                    photo: url,
                })
            }
            setTweet("")
            setFile(null)
        } catch (e){
            console.log(e)
        } finally {
            setIsLoading(false)
            navigate('/')
        }
    }
    return(
        <Wrapper>
            <Form onSubmit={onSubmit}>
                {file || photo ? <Column><Photo src={imgSrc !== "" ? imgSrc : photo}/></Column> : null}
                <TextArea required rows={5} maxLength={180} onChange={onChange} value={tweet} placeholder="What is happening?" />
                <AttachFileButton htmlFor="file">{imgSrc !== "" || photo ? "Change Photo" : "Add Photo"}</AttachFileButton>
                <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
                <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
            </Form>
        </Wrapper>
    )
}
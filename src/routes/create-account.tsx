import {useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import {auth} from "../firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {FirebaseError} from "firebase/app"
// ** component **
import {Wrapper, Form, Switcher, Input, Title, Error} from "../components/auth-component"

export default function CreateAccount(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e
        if(name === "name"){
            setName(value)
        } else if (name === "email"){
            setEmail(value)
        } else if (name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        if(isLoading || name === "" || email === "" || password === "") return;
        try {
            setIsLoading(true)
            // 1. 계정 만들기
            const credentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log(credentials.user)
            // 2. 유저 이름 셋팅
            await updateProfile(credentials.user, {
                displayName: name,
            })
            // 3. 홈페이지로 redirect
            navigate('/')
        } catch(e) {
            if(e instanceof FirebaseError){
                setError(e.message)
            }
        } finally {
            setIsLoading(false)
        }
        console.log(name, email, password)
    }

    return(
        <Wrapper>
            <Title>Join 🕊</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="name" value={name} placeholder="name" type="text" required />
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
                <Input type="submit" value={ isLoading ? "Loading..." : "Create Account" } />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Already have an account? <Link to="/login">Log in &rarr;</Link>
            </Switcher>
        </Wrapper>
    )
}
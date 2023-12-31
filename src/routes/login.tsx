import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
// ** firebase **
import {FirebaseError} from "firebase/app";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
// ** component **
import {Wrapper, Form, Switcher, Input, Title, Error} from "../components/auth-component";
import GithubBtn from "../components/github-btn";

export default function Login(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e
        if (name === "email"){
            setEmail(value)
        } else if (name === "password"){
            setPassword(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        if(isLoading || email === "" || password === "") return;
        try {
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
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
            <Title>Log into Tweet</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
                <Input type="submit" value={ isLoading ? "Loading..." : "Log in" } />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don't have an account? <Link to="/create-account">Create One</Link>
            </Switcher>
            <Switcher>
                <Link to="/find-password">Forgot your Password?</Link>
            </Switcher>
            <GithubBtn />
        </Wrapper>
    )
}
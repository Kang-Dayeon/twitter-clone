import {useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import {FirebaseError} from "firebase/app"
import {sendPasswordResetEmail} from "firebase/auth"
import {auth} from "../firebase";
// ** component **
import {Wrapper, Form, Switcher, Input, Title, Error} from "../components/auth-component"

export default function FindPassword(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e
        if (name === "email"){
            setEmail(value)
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        if(isLoading || email === "") return;
        try {
            setIsLoading(true)
            await sendPasswordResetEmail(auth, email)
            navigate('/login')
        } catch(e) {
            if(e instanceof FirebaseError){
                setError(e.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <Wrapper>
            <Title>Find Password</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input type="submit" value={ isLoading ? "Loading..." : "Send Email" } />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Already have an account? <Link to="/login">Log in</Link>
            </Switcher>
            <Switcher>
                Don't have an account? <Link to="/create-account">Create One</Link>
            </Switcher>
        </Wrapper>
    )
}
import {useState, useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// ** style **
import styled, {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
// ** components **
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase"
import ProtectedRoute from "./components/protected-route";
import FindPassword from "./routes/find-password";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-account",
    element: <CreateAccount />
  },
  {
    path: "/find-password",
    element: <FindPassword />
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    color: white;
  }
`

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady()
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <Wrapper>
      <GlobalStyles/>
      {isLoading ? <LoadingScreen/> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App

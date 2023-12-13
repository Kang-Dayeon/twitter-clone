import {Outlet} from "react-router-dom"

export default function Layout(){
    return(
        <>
            {/* router를 활용해서 layout 밑에 자식들이 여기로 들어옴 */}
            <Outlet/>
        </>
    )
}
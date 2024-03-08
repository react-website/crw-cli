import { redirect } from "react-router-dom"

const appLoader = () => {
    const token = sessionStorage.getItem('token')
    
    if (!token) return redirect('/login')
    return token
}

export default appLoader

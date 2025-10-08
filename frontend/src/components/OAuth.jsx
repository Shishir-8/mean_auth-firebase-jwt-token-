import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../firebase"
import api from "../axios"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../redux/auth/authSlice"
import { googleLogin } from "../redux/auth/authThunk"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user, loading, error} = useSelector((state)=> state.auth)

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const token = await result.user.getIdToken()

      dispatch(googleLogin(token))


    } catch (error) {
      console.log("Google Login error", error)
    }
  }

  useEffect(()=> {
    if(user) {
      navigate("/dashboard")
    }
  }, [user, navigate])


  return (
    <div className='max-w-full mt-4'>
      <button
        onClick={handleGoogleClick}
        className="btn btn-outline btn-secondary w-full">Sign In With Google</button>
        {error && <p className="text-red-500">{error}</p>}

    </div>
  )
}

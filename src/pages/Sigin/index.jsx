import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'

import logoGoogle from '../../../public/google.png'



export default function Signin() {

  const navigate = useNavigate()

    function signInWithGoogle(){
        const provider = new GoogleAuthProvider

        signInWithPopup(auth, provider)
        .then((result) =>{

            console.log(result.user)
            navigate('/register')
            
        }).catch((error) =>{
            console.log(error)
        })
    }
  return (
    <div className="relative">
      <div className="relative w-[800px] h-[450px]">
        <div className="absolute w-[250px] h-[250px] bg-bubble-red rounded-full bottom-0"></div>
        <div className="absolute w-[250px] h-[250px] bg-bubble-blue rounded-full top-0 right-0"></div>
      </div>

      <div className=" absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-primary-color w-[600px] h-[350px] backdrop-blur-md
                        border-2 border-border-color rounded-lg flex justify-center items-center">

        <button onClick={signInWithGoogle} className="bg-button-color text-xl font-medium font-popp tracking-widest p-4 px-4 rounded-full flex justify-center items-center gap-4 shadow-shadow-button hover:bg-button-hover
                            transition duration-300 ease-in-out hover:translate-y-1 hover:border-2 hover:border-border-color hover:shadow-shadow-button-hover">
            <img className="w-[45px]" src={logoGoogle} alt="logo Google"/>Login com Google</button>                            
      </div>
    </div>
  );
}

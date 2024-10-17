import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";

import logoGoogle from "../../../public/google.png";
import { useAuth } from "../../context/AuthProvider";

export default function Signin() {

  const { setUser } = useAuth()
  const navigate = useNavigate();

  function getEmail(email) {
    const parts = email.split("@");
    return parts.length === 2 ? parts[1] : null;

  }


  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {

        const user = result.user
        const email = user.email;
        const domain = getEmail(email);
        


        if(user){
          setUser(user)
          navigate('/register')
        }else{
          window.alert("Dominío inválido")       
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="relative flex items-center justify-center md:min-h-screen">
      <div className="relative">
        <div className="relative w-screen h-svh lg:w-[830px] lg:h-[560px] overflow-hidden">
          <div className="absolute w-[12rem] h-[12rem] lg:w-[250px] lg:h-[250px] bg-bubble-red rounded-full bottom-0"></div>
          <div className="absolute w-[12rem] h-[12rem] lg:w-[250px] lg:h-[250px] bg-bubble-blue rounded-full top-0 right-0"></div>
        </div>

        <div
          className=" absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-primary-color w-11/12 h-3/4 lg:w-[600px] lg:h-[350px] backdrop-blur-md
                        border-2 border-border-color rounded-lg flex justify-center items-center"
        >
          <button
            onClick={signInWithGoogle}
            className="bg-button-color text-xl font-medium font-popp tracking-widest p-4 px-4 rounded-full flex justify-center items-center gap-4 shadow-shadow-button hover:bg-button-hover
                            transition duration-300 ease-in-out hover:translate-y-1 hover:border-2 hover:border-border-color hover:shadow-shadow-button-hover"
          >
            <img className="w-[45px]" src={logoGoogle} alt="logo Google" />
            Login com Google
          </button>
        </div>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Schedule from "../Schedule";

export default function UserDetail() {
    const { uid } = useParams()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {

        const fetchUserData = async () => {

            try {


                console.log(uid)
                const response = await fetch(`${API_URL}/user/${uid}`)
                const data = await response.json()

                setUserData(data)


            } catch (error) {
                console.log("Erro ao buscar usuário na página UserDetail", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [uid])

    if (isLoading) return <Loader />

    console.log(userData)

    return (
        <div className="container w-[90%] m-auto">
            <Header name={userData?.name} img={userData?.photoUrl} />
            <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
            <p>Nome: {userData?.name}</p>
            <p>Email: {userData?.email}</p>
            <p>Cargo: {userData?.role}</p>
            <p>Escala: {userData?.time}</p>
            {/* Adicionar mais informações aqui */}


            <Schedule showHeader={false} onClick={onclick} uid={uid}/>
        </div>
    );
}
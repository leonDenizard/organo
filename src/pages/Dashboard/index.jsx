import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";
import Slack from "../../components/icons/Slack";
import Whats from "../../components/icons/Whats";
import Gmail from "../../components/icons/Gmail";
import Clock from "../../components/icons/Clock";
import Check from "../../components/icons/Check";
import Conffeti from "../../components/icons/Conffeti";
import ChildIcon from "../../components/icons/ChildIcon";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import FilterBar from "../../components/FilterBar";
import PopUpMenu from "../../components/PopUpMenu";
import { checkUserExists } from "../../services/firebase";

export default function Dashboard() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [userDataLogged, setUserDataLogged] = useState(null);
  const [allUsers, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedUsers, setSortedUsers] = useState(allUsers);
  const [isAscending, setIsAscending] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [onSelectFunction, setOnSelectFunction] = useState(null);


  const API_URL = import.meta.env.VITE_API_URL
  console.log("API_URL no frontend:", API_URL)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        //Retorna somente 1 usuário
        const userUIDQuery = await fetch(`${API_URL}/user/${user.uid}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const exists = await checkUserExists(user.uid)

        console.log(exists)
        if(!exists){
          navigate("/register")
        }
        
        const userUIDResponse = await userUIDQuery.json()
        
        const allUserQuery = await fetch(`${API_URL}/user/`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const allUserResponse = await allUserQuery.json()
    
        try {
          
          if (!allUserResponse.empty) {
            let allUserData = [];

            allUserData = [...allUserResponse]

            setAllUser(allUserData);
            
            setSortedUsers(allUserData);

            
            if (!userUIDQuery.empty) {
              
              const userData = userUIDResponse

              setUserDataLogged(userData);
            }

          } else {
            console.log("Nenhum documento encontrado");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("No user authenticated");
      }
    };

    fetchUserData();
  }, [user]);

  let firstName = "";
  let profilePhoto = "";

  // Verificação se os dados foram carregados antes de acessar
  if (userDataLogged && userDataLogged.name) {
    firstName = userDataLogged.name.split(" ")[0];
    //   nameFormated = userDataLogged.name.split(" ").slice(0, 2).join(" ");
  }

  if (userDataLogged && userDataLogged.photoUrl) {
    profilePhoto = userDataLogged.photoUrl;
  }

  const nameCardFormatted = (names) => {
    return (names = names.split(" ").slice(0, 2).join(" "));
  };

  if (isLoading) {
    return <Loader />;
  }

  //console.log(userDataLogged)

  if(!userDataLogged){
    navigate('/register')
  }

  const sortByName = () => {
    const usersOrder = [...allUsers].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    setSortedUsers(usersOrder);
    setIsAscending(!isAscending);
  };



  const openModal = (options, onSelect) => {
    setModalOptions(options);
    setOnSelectFunction(() => onSelect);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const roles = ["gerente", "super", "pleno", "jriii", "jrii", "jri", "trial"];
  const sortByRule = (selectedRole) => {
    const sortedUsers = [...allUsers].filter(
      (user) => user.role === selectedRole
    );
    setSortedUsers(sortedUsers);
    closeModal(); 
  };

  const times = ["afternoon", "morning", "night"]
  const sortByTime = (selectedTime) => {
    const sortedUsers = [...allUsers].filter((user) => user.time === selectedTime)

    setSortedUsers(sortedUsers)
    closeModal(); 
  }

  const manager = ["guto", "greice", "diogo", "luan","duda","teteu"]
  const sortByManager = (selectedManager) => {
    const sortedUsers = [...allUsers].filter((user) => user.manager === selectedManager)
    setSortedUsers(sortedUsers)
    closeModal();
  }

  const handleSchedule = () => {
    navigate("/schedule");
  };

  const handleInputName = (event) => {
    const inputName = event.target.value.toLowerCase();

    const matchingUsers = allUsers.filter((user) =>
      user.name.toLowerCase().includes(inputName)
    );

    setSortedUsers(matchingUsers);
  };

  const handleLogOut = async() =>{
    await logOut()
    navigate("/")
  }

  const isAdmin = userDataLogged.admin
  console.log(isAdmin)

  return (
    <div className="container w-[95%] lg:w-[90%] m-auto lg:h-screen h-dvh">
      {userDataLogged ? (
        <>
          <Header name={firstName} img={profilePhoto} logout={handleLogOut}></Header>

          <SearchBar handleInputName={handleInputName} />
          <FilterBar
            orderByName={sortByName}
            orderByRole={() => openModal(roles, sortByRule)}
            orderByManager={() => openModal(manager, sortByManager)}
            orderByTime={() => openModal(times, sortByTime)}
            handleSchedule={handleSchedule}
          />
          <div className="relative gap-4 top-28 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {sortedUsers.map((user, index) => (
              <Card
                key={index}
                imgProfile={user.photoUrl}
                name={nameCardFormatted(user.name)}
                surname={user.surname}
                role={user.role}
                iconSlack={<Slack />}
                slack={user.slack}
                iconWhats={<Whats />}
                whats={user.whatsapp}
                iconMail={<Gmail />}
                mail={user.email}
                iconHour={<Clock />}
                hour={user.time}
                iconSuper={<Check />}
                supe={user.manager}
                iconBirthday={<Conffeti />}
                birthday={user.birthday}
                iconChild={<ChildIcon />}
                child={user.child}
                onClick={() => isAdmin && navigate(`/user/${user.uid}`)}
              />
            ))}
          </div>
          {/* Renderizar o modal se estiver aberto */}
          {isOpenModal && (
          <PopUpMenu
            options={modalOptions}
            onSelect={onSelectFunction}
            closeModal={closeModal}
          />)}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

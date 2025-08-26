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
import { Navigate, useNavigate } from "react-router-dom";
import FilterBar from "../../components/FilterBar";
import PopUpMenu from "../../components/PopUpMenu";
import { checkUserExists } from "../../services/firebase";
import Coffe from "../../components/icons/Coffe";
import useParameterization from "../../hooks/useParameterization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faClock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  deleteUserById,
  getAllUsers,
} from "../../services/parameterizationService";
import Breadcrumb from "../../components/Breadcrumb";

export default function Dashboard() {
  const { googleUser, logOut, isAdmin, backendUser } = useAuth();
  const navigate = useNavigate();

  const [userDataLogged, setUserDataLogged] = useState(null);
  const [allUsers, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedUsers, setSortedUsers] = useState(allUsers);
  const [isAscending, setIsAscending] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [onSelectFunction, setOnSelectFunction] = useState(null);

  const { allSquads, allPositions, allSuper, workShifts } =
    useParameterization();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      if (googleUser) {
        //Retorna somente 1 usuário
        const userUIDQuery = await fetch(
          `${API_URL}/user/sigin/${googleUser.uid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const exists = await checkUserExists(googleUser.uid);

        if (!exists) {
          navigate("/register");
        }

        const userUIDResponse = await userUIDQuery.json();

        const allUserQuery = await fetch(`${API_URL}/user/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const allUserResponse = await allUserQuery.json();

        try {
          if (!allUserResponse.empty) {
            let allUserData = [];

            allUserData = [...allUserResponse.data];

            setAllUser(allUserData);

            setSortedUsers(allUserData);

            if (!userUIDQuery.empty) {
              const userData = userUIDResponse;

              setUserDataLogged(userData.data);
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
  }, [googleUser]);

  let firstName = "";
  let profilePhoto = backendUser?.data.photoUrl
    ? backendUser.data.photoUrl
    : userDataLogged?.photoUrl;

  // Verificação se os dados foram carregados antes de acessar
  if (userDataLogged && userDataLogged.name) {
    firstName = userDataLogged.name.split(" ")[0];
    //   nameFormated = userDataLogged.name.split(" ").slice(0, 2).join(" ");
  }

  const nameCardFormatted = (names) => {
    return (names = names.split(" ").slice(0, 2).join(" "));
  };

  if (isLoading) {
    return <Loader />;
  }

  //console.log(userDataLogged)

  if (!userDataLogged) {
    navigate("/register");
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

  const roles = allPositions;

  const sortByRule = (selectedRole) => {
    const sortedUsers = [...allUsers].filter(
      (user) => user.role === selectedRole
    );

    setSortedUsers(sortedUsers);
    closeModal();
  };

  const times = workShifts;
  const sortByTime = (selectedTime) => {
    const sortedUsers = [...allUsers].filter(
      (user) => user.time === selectedTime
    );

    setSortedUsers(sortedUsers);
    closeModal();
  };

  const manager = allSuper;
  const sortByManager = (selectedManager) => {
    const sortedUsers = [...allUsers].filter(
      (user) => user.manager === selectedManager
    );
    setSortedUsers(sortedUsers);
    closeModal();
  };

  const sortBySquadI = (squadId) => {
    const sortedUsers = allUsers.filter(
      (user) =>
        Array.isArray(user.squad) &&
        user.squad.some((id) => String(id) === String(squadId))
    );

    setSortedUsers(sortedUsers);
    closeModal();
  };

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

  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };

  const handleAdmin = async () => {
    if (isAdmin) {
      navigate("/admin");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const deletedUser = await deleteUserById(userId); // retorna o objeto deletado
      if (deletedUser && deletedUser._id) {
        // Remove da lista local usando o _id
        const updatedUsers = allUsers.filter(
          (user) => user._id !== deletedUser._id
        );
        setAllUser(updatedUsers);
        
        userDataLogged._id === deletedUser._id ? logOut() : setSortedUsers(updatedUsers)
        
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <div className="container w-[95%] lg:w-[95%] m-auto lg:h-screen h-dvh">
      {userDataLogged ? (
        <>
          <Header
            name={firstName}
            img={profilePhoto}
            logout={handleLogOut}
          ></Header>

          <SearchBar handleInputName={handleInputName} />
          <FilterBar
            orderByName={sortByName}
            orderByRole={() => openModal(roles, sortByRule)}
            orderByManager={() => openModal(manager, sortByManager)}
            orderByTime={() => openModal(times, sortByTime)}
            orderBySquads={() => openModal(allSquads, sortBySquadI)}
            handleAdmin={() => handleAdmin()}
            handleSchedule={handleSchedule}
          />

          <div className="relative gap-4 top-28 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {sortedUsers.map((user, index) => (
              <Card
                key={index}
                imgProfile={user.photoUrl}
                name={nameCardFormatted(user.name)}
                surname={user.surname}
                role={
                  allPositions.find((position) => position._id === user.role)
                    ?.name || "Sem cargo"
                }
                iconSlack={<Slack />}
                slack={user.slack}
                iconWhats={<Whats />}
                whats={user.whatsapp || ""}
                iconMail={<Gmail />}
                mail={user.email}
                iconHour={<Clock />}
                hour={(() => {
                  const shift = workShifts.find((ws) => ws._id === user.time);
                  return shift
                    ? `${shift.startTime} - ${shift.endTime}`
                    : "Horário não definido";
                })()}
                iconSuper={<Check />}
                manager={
                  allSuper.find((sup) => sup._id === user.manager)?.name ||
                  "Sem Super"
                }
                iconInterval={<Coffe />}
                interval={user.interval}
                iconBirthday={<Conffeti />}
                birthday={user.birthday}
                iconChild={<ChildIcon />}
                child={user.child}
                onClick={() => navigate(`/user/${user._id}`)}
                onDelete={() => handleDeleteUser(user._id)}
              />
            ))}
          </div>
          {/* Renderizar o modal se estiver aberto */}
          {isOpenModal && (
            <PopUpMenu
              options={modalOptions}
              onSelect={onSelectFunction}
              closeModal={closeModal}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

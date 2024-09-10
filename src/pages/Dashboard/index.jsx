import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
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
import { Navigate } from "react-router-dom";
import FilterBar from "../../components/FilterBar";

export default function Dashboard() {
  const { user } = useAuth();

  const [userDataLogged, setUserDataLogged] = useState(null);
  const [allUsers, setAllUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedUsers, setSortedUsers] = useState(allUsers);
  const [isAscending, setIsAscending] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        //Retorna somente 1 usuário
        const userUIDQuery = query(
          collection(db, "users"),
          where("uid", "==", user.uid)
        );

        const allUserQuery = collection(db, "users");
        // console.log("Query created", q)

        try {
          const querySnapshot = await getDocs(allUserQuery);
          // console.log("Query snapshot: ", querySnapshot)

          if (!querySnapshot.empty) {
            const allUserData = [];

            querySnapshot.forEach((doc) => {
              //console.log(" => ", doc.data())

              allUserData.push(doc.data());
            });

            setAllUser(allUserData);
            setSortedUsers(allUserData);

            const userUIDSnapshot = await getDocs(userUIDQuery);
            if (!userUIDSnapshot.empty) {
              const userDoc = userUIDSnapshot.docs[0];
              const userData = userDoc.data();

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

  if (!userDataLogged) {
    return <Navigate to={"/register"} />;
  }

  const sortByName = () => {
    const usersOrder = [...allUsers].sort((a, b) =>
      isAscending ? (a.name.localeCompare(b.name)) : (b.name.localeCompare(a.name))
    );

    setSortedUsers(usersOrder);
    setIsAscending(!isAscending)
  };

  const priorityRole = {
    1: "gerente",
    2: "super",
    3: "pleno",
    4: "jriv",
    5: "jriii",
    6: "jrii",
    7: "jri",
    8: "trial"
  }

  const sortByRule = () => {
    const priorityMap = Object.fromEntries(
      Object.entries(priorityRole).map(([key, value]) => [value, key])
    )

    const sortedUsers = [...allUsers].sort((a, b) => {
      const priorityA = parseInt(priorityMap[a.role] || 9)
      const priorityB = parseInt(priorityMap[b.role] || 9)

      return isAscending ? (priorityA - priorityB) : (priorityB - priorityA)
    })

    setSortedUsers(sortedUsers)
    setIsAscending(!isAscending)
  }



  return (
    <div className="container w-[90%] m-auto min-h-screen">
      {userDataLogged ? (
        <>
          <Header name={firstName} img={profilePhoto}></Header>

          <SearchBar />
          <FilterBar orderByName={sortByName} orderByRule={sortByRule}/>
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
              />
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

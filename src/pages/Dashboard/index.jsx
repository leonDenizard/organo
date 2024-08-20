import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";
import Slack from "../../components/icons/Slack"
import Whats from "../../components/icons/Whats"
import Gmail from "../../components/icons/Gmail"
import Clock from "../../components/icons/Clock"
import Check from "../../components/icons/Check"
import Conffeti from "../../components/icons/Conffeti"


export default function Dashboard() {
  const { user } = useAuth();

  const [userDataLogged, setUserDataLogged] = useState(null);
  const [allUsers, setAllUser] = useState([]);

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
        }
      } else {
        console.log("No user authenticated");
      }
    };

    fetchUserData();
  }, [user]);

  let firstName = "";
  let profilePhoto = "";
  let nameFormated = ""

  // Verificação se os dados foram carregados antes de acessar
  if (userDataLogged && userDataLogged.name) {
    firstName = userDataLogged.name.split(" ")[0];
    nameFormated = userDataLogged.name.split(" "). slice(0, 2).join(" ");
  }

  if (userDataLogged && userDataLogged.photoUrl) {
    profilePhoto = userDataLogged.photoUrl;
  }

  // let nameFormated = []
  // for(let i = 0; i <= 1; i++){
  //   nameFormated.push(userDataLogged.name.split(" ")[i])
  // }
  // nameFormated = nameFormated.toString().replace(",", " ")
  console.log("User logged", userDataLogged);
  console.log(allUsers);

  return (
    <div className="container w-[90%] m-auto min-h-screen">
      <Header name={firstName} img={profilePhoto}></Header>
      

      <SearchBar />

      <div className="relative gap-4 top-28 grid sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-5">
        {allUsers.map((user, index) => (
          <Card
            key={index}
            imgProfile={user.photoUrl}
            name={nameFormated}
            surname={user.surname}
            role={user.role}
            iconSlack={<Slack/>}
            slack={user.slack}

            iconWhats={<Whats/>}
            whats={user.whats}

            iconMail={<Gmail/>}
            mail={user.email}

            iconHour={<Clock/>}
            hour={user.time}

            iconSuper={<Check/>}
            supe={user.manager}

            iconBirthday={<Conffeti/>}
            birthday={user.birthday}
          />
        ))}
      </div>
    </div>
  );
}

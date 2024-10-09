import { db } from "./firebase";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";

export const uploadScheduleToFirestore = async (collectionName, scheduleData) => {
  try {
    // Verifica se a coleção já contém documentos
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    if (!querySnapshot.empty) {
      console.error(`A coleção ${collectionName} já existe.`);
      return { success: false, message: `A coleção ${collectionName} já existe.` };
    }

    // Se a coleção não existe, continua com o upload dos dados
    for (const [date, userIds] of Object.entries(scheduleData)) {
      const docRef = doc(db, collectionName, date);
      await setDoc(docRef, { userIds });
    }

    console.log("Escala enviada com sucesso para o Firestore!");
    return { success: true, message: "Escala enviada com sucesso para o Firestore!" };

  } catch (error) {
    console.error("Erro ao enviar a escala para o Firestore: ", error);
    return { success: false, message: `Erro: ${error.message}` };
  }
};

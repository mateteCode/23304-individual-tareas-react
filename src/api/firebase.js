import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

/* Funciones privadas */
const getField = async (col, field, fieldId, id) => {
  try {
    const q = query(collection(db, col), where(fieldId, "==", id));
    const docs = await getDocs(q);
    const documentRef = doc(db, col, docs.docs[0].id);
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      const result = documentSnapshot.data()[field];
      return result;
    } else {
      console.log("No existe el documento");
    }
  } catch (err) {
    console.log("No se puede acceder al campo");
  }
  return null;
};

const setField = async (col, field, fieldId, id, value) => {
  try {
    const q = query(collection(db, col), where(fieldId, "==", id));
    const docs = await getDocs(q);
    const documentRef = doc(db, col, docs.docs[0].id);
    setDoc(documentRef, { [field]: value }, { merge: true });
  } catch (err) {
    console.log("No se puede guardar en valor en el campo");
  }
  return null;
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        tasks: [],
        city: "Buenos Aires",
        photo: user.photoURL,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const getTasks = async (user, setTasks) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    const documentRef = doc(db, "users", docs.docs[0].id);
    const documento = await getDoc(documentRef);
    if (documento.exists()) {
      setTasks(documento.data().tasks);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const addTask = async (user, task) => {};

const saveTasks = async (user, tasks) => {
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  const documentRef = doc(db, "users", docs.docs[0].id);
  await updateDoc(documentRef, { tasks: tasks });
};

const getCity = async (userId) => {
  return await getField("users", "city", "uid", userId);
};

const saveCity = async (userId, city) => {
  await setField("users", "city", "uid", userId, city);
};

export {
  auth,
  db,
  signInWithGoogle,
  logout,
  getTasks,
  addTask,
  saveTasks,
  getCity,
  saveCity,
};

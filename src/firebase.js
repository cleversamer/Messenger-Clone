import { initializeApp } from "firebase";

const config = {
  apiKey: "AIzaSyCYOwDdHhU-ImIEpX5fWV8L8eV9sqz3s1A",
  authDomain: "samer-messenger.firebaseapp.com",
  projectId: "samer-messenger",
  storageBucket: "samer-messenger.appspot.com",
  messagingSenderId: "343558646562",
  appId: "1:343558646562:web:aeb2cfd8c256388f67537b",
  measurementId: "G-6QMEE53CWP",
};

const app = initializeApp(config);

const db = app.firestore();

export default db;

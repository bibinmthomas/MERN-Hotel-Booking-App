import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDxZCboUrYS2TxRf2pX35IUwtFDUF7mec8",
//   authDomain: "project-otp-service.firebaseapp.com",
//   projectId: "project-otp-service",
//   storageBucket: "project-otp-service.appspot.com",
//   messagingSenderId: "58245478895",
//   appId: "1:58245478895:web:4683051bf9c6c7c8801e1a",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDxZCboUrYS2TxRf2pX35IUwtFDUF7mec8",
  authDomain: "project-otp-service.firebaseapp.com",
  projectId: "project-otp-service",
  storageBucket: "project-otp-service.appspot.com",
  messagingSenderId: "58245478895",
  appId: "1:58245478895:web:2e54a263ba3cd6ae801e1a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const authentication = getAuth(app);
export const storage_bucket = getStorage(app);

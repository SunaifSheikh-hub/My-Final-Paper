import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeVAMj1LemR3Nw8Fo5NyRtvsPTtfTT0QY",
  authDomain: "final-hackathon-5137f.firebaseapp.com",
  projectId: "final-hackathon-5137f",
  storageBucket: "final-hackathon-5137f.appspot.com",
  messagingSenderId: "512632417645",
  appId: "1:512632417645:web:81bc6bff169ddee2117e64",
  measurementId: "G-58BGNLXR7R"
};


const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import {getFirestore,addDoc,collection } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
  import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

  
  const firebaseConfig = {
    apiKey: "AIzaSyBqWdpch9T9n-0oGVCgXPN8tNioG72U0iE",
    authDomain: "js-project-1-7ff72.firebaseapp.com",
    projectId: "js-project-1-7ff72",
    storageBucket: "js-project-1-7ff72.appspot.com",
    messagingSenderId: "856923769856",
    appId: "1:856923769856:web:8bca9190cb4833ed299ce5",
    measurementId: "G-YWQE7WWZXB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);


function signup() {
    let email=document.getElementById("email").value
    let password=document.getElementById("password").value


    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    console.log("Account Created Successfully");
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });
}

module.signup=signup



function login() {
  let email=document.getElementById("email").value
  let password=document.getElementById("password").value

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem("Accesstoken",user.accessToken)
    console.log("Login successfully");
    setTimeout(()=>{
      window.location.assign("./form.html")
    },3000)
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}

module.login=login




function formdetails() {
  let name=document.getElementById("name").value
  let lastname=document.getElementById("last-name").value
  let number=document.getElementById("phonenumber").value
  let aadhar=document.getElementById("aadhar").files[0]
  let date=document.getElementById("smart").value
  let address=document.getElementById("community").value

addDoc(collection(db, "userDetail"), {
    firstName:name,
    lastName:lastname,
    mobileNumber:number,
    dateofbirth:date,
    address:address
  });

const storageRef = ref(storage, "aadhar");
// 'file' comes from the Blob or File API
uploadBytes(storageRef,aadhar).then((snapshot) => {
  console.log('Uploaded a blob or file!');
})
.catch((err)=>{
console.log(err);
})
}

module.formdetails=formdetails

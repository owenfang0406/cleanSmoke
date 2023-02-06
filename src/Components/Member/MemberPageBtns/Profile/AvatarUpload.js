import React, {useState, useContext} from 'react'
import { storage, db } from '../../../firebase-config';
import { ref, uploadBytes, list, deleteObject, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../../../index";
import { v4 } from 'uuid';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

function AvatarUpload() {
  const { authUser, userSignOut, updateNewURL } = useContext(UserContext);
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload == null) return;
    const dbCollection = collection(db, `${authUser.email}`);
    const dbRef = doc(db, `${authUser.email}`, "avatar");
    const folderRef = ref(storage,`avatar/${authUser.email}/`);
    const imageRef = ref(storage, `avatar/${authUser.email}/${imageUpload.name + v4()}`);
    list(folderRef).then((res)=>{
      if (res.items.length === 0) {
        uploadBytes(imageRef, imageUpload).then(()=>{
          alert("imgUploaded")
          getDownloadURL(imageRef).then((downloadURl) =>{
            setDoc(dbRef,{
              avatarURL: downloadURl,
              id: dbRef.id
            });
            alert("url: " + downloadURl);
          })
        })
        return
      }
      res.items.forEach((itemRef)=>{
        deleteObject(itemRef).then(()=>{
          console.log("Old image deleted.");
          uploadBytes(imageRef, imageUpload).then(()=>{
            alert("imgUploaded")
            getDownloadURL(imageRef).then((downloadURl) =>{
              setDoc(dbRef,{
                avatarURL: downloadURl,
                id: dbRef.id
              });
              updateNewURL(downloadURl);
              alert("url: " + downloadURl);
            })
          })
        })
      })
    })
  };

  return (
    <div>
      <div>
        <input type="file" onChange={(e) => {
          setImageUpload(e.target.files[0])}}></input>
        <button onClick={uploadImage}>Submit</button>
      </div>
    </div>
  )
}

export default AvatarUpload
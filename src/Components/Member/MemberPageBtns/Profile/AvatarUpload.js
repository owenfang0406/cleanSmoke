import React, { useState, useContext } from 'react'
import { storage, db } from '../../../firebase-config';
import { ref, uploadBytes, list, deleteObject, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../../../index";
import { v4 } from 'uuid';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import styles from "./AvatarUpload.module.css";
import Loader from '../../../Loader/Loader';

function AvatarUpload() {
  const { authUser, updateProfiles, profiles } = useContext(UserContext);
  const [imageUpload, setImageUpload] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewURl] = useState(null);
  const [error, setError] = useState("No image selected");
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    const reader = new FileReader();
    reader.onload = function(e) {
      setPreviewURl(e.target.result);
      // console.log(e.target);
      // console.log(profiles)
    }
      reader.readAsDataURL(e.target.files[0]);
  }
  const uploadImage = () => {
    setIsLoading(true)
    if (imageUpload == null) {
        setError("No photo selected");
        setIsLoading(false)
        return
    };
    const dbCollection = collection(db, `${authUser.uid}`);
    const dbRef = doc(db, 'users', `${authUser.uid}`);
    const folderRef = ref(storage,`avatar/${authUser.uid}/`);
    const imageRef = ref(storage, `avatar/${authUser.uid}/${imageUpload.name + v4()}`);
    list(folderRef).then((res)=>{
      if (res.items.length === 0) {
        uploadBytes(imageRef, imageUpload).then(()=>{
          // alert("imgUploaded")
          getDownloadURL(imageRef).then((downloadURl) =>{
            setDoc(dbRef,
            {Profiles:{
              ...profiles,
              avatarURL: downloadURl,
              uid: authUser.uid,
              email: authUser.email
            }});
            updateProfiles({
              ...profiles,
              avatarURL: downloadURl,
            });
            // alert("url: " + downloadURl);
            setImageUpload(null);
            setSelectedFile(null);
            setPreviewURl(null);
            // setError("");
            setIsLoading(false)
            setError("Upload Successfully")
          })
        })
        return
      }
      res.items.forEach((itemRef)=>{
        deleteObject(itemRef).then(()=>{
          // console.log("Old image deleted.");
          uploadBytes(imageRef, imageUpload).then(()=>{
            // alert("imgUploaded")
            getDownloadURL(imageRef).then((downloadURl) =>{
              setDoc(dbRef,
                {Profiles:{
                  ...profiles,
                  avatarURL: downloadURl,
                  uid: authUser.uid,
                  email: authUser.email
                }});
                updateProfiles({
                ...profiles,
                avatarURL: downloadURl,
              });
              // alert("url: " + downloadURl);
              setImageUpload(null);
              setSelectedFile(null);
              setPreviewURl(null);
              setIsLoading(false)
              // setError("");
              setError("Upload Successfully")
            })
          })
        })
      })
    })
  };

  return (
    <div>
      <div>
        {isLoading && <Loader></Loader>}
        {previewUrl ? (
        <div className={styles.wrapper}>
          <div className={styles.previewCon}>
            <img className={styles.preview} src={previewUrl} alt="Preview" />
          </div>
        </div>
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.previewCon}>
              <div className={styles.previewText}>{error}</div>
            </div>
        </div>
        )}
        <div className={styles.UploadForm}>
          <label for="file" className={styles.uploadBtn}>
            <span className={styles.UploadStr}>Choose</span>
            <input type="file" accept="image/*" onChange={(e) => {
              setImageUpload(e.target.files[0]);
              handleFileChange(e);
              }}></input>
          </label>
          {/* {error !== "" && <div className={styles.errorMsg}>{error}</div>} */}
          <button type='submit' className={styles.submitBtn} onClick={uploadImage}>
            <span className={styles.submitStr}>Submit</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvatarUpload
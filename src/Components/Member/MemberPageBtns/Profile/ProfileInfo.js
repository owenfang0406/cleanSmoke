import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../../../../index"
import styles from "./ProfilePage.module.css"
import { MdModeEdit, MdArrowForwardIos } from "react-icons/md"
import { Link } from "react-router-dom"
import EditForm from "./EditForm"

function ProfileInfo() {
  const { authUser, userSignOut, profiles } = useContext(UserContext)
  const [email, setEmail] = useState(authUser ? authUser.email : "")
  const [showEditForm, setShowEditForm] = useState(false)
  const shouldShowNameForm = showEditForm
  const formActions = (action) => {
    if (!action) {
      setShowEditForm(false)
    }
  }

  useEffect(() => {
    if (authUser) {
      setEmail(authUser.email)
    }
  }, [authUser])

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoCon}>
        <div className={styles.avatarWrapper}>
          <Link to="/member/updateAvatar">
            <div className={styles.avatarCon}>
              <img
                className={styles.avatar}
                src={profiles.avatarURL ? profiles.avatarURL : ""}
              ></img>
              <div className={styles.editBtn}>
                <MdModeEdit className={styles.editIcon}></MdModeEdit>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.infoListCon}>
        <div className={styles.infoTitle}>Profile Information</div>
        <div className={styles.inputCon} onClick={() => setShowEditForm(true)}>
          <label>Email: </label>
          <input
            className={`${styles.inputs}`}
            type="email"
            value={email}
            disabled
          ></input>
          <MdArrowForwardIos className={styles.inputIcons} />
        </div>
        <div className={styles.inputCon} onClick={() => setShowEditForm(true)}>
          <label>Name: </label>
          <input
            className={styles.inputs}
            disabled
            value={profiles.name}
          ></input>
          <MdArrowForwardIos className={styles.inputIcons} />
        </div>
        <div className={styles.inputCon} onClick={() => setShowEditForm(true)}>
          <label>Birthday: </label>
          <input
            className={styles.inputs}
            disabled
            value={profiles.birth}
          ></input>
          <MdArrowForwardIos className={styles.inputIcons} />
        </div>
        <div className={styles.inputCon} onClick={() => setShowEditForm(true)}>
          <label>Gender: </label>
          <input
            className={styles.inputs}
            disabled
            value={profiles.gender}
          ></input>
          <MdArrowForwardIos className={styles.inputIcons} />
        </div>
      </div>
      {shouldShowNameForm && (
        <EditForm
          formActions={formActions}
          type="text"
          ShouldShow={showEditForm}
          LabelName="Name"
        ></EditForm>
      )}
    </div>
  )
}

export default ProfileInfo

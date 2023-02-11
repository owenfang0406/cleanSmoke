import React from 'react'
import styles from "./Comment.module.css";
import { BiUserCircle } from "react-icons/bi"
import CommentForm from './CommentForm';
import { updateComment } from './api';


const Comment = ({comment, replies, currentUserId, deleteComment, activeComment, setActiveComment, parentId = null, addComment, updateComment }) => {
  const canReply = Boolean(currentUserId)
  const fiveMinute = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinute;
  const canEdit = currentUserId === comment.userId && !timePassed;
  const canDelete = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const isReplying = 
  activeComment && 
  activeComment.type === "replying" &&
  activeComment.id === comment.id;
  const isEditing = 
  activeComment && 
  activeComment.type === "editing" &&
  activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;
  return (
    <div className={styles.comment}>
        <div className={styles.comment_image_container}>
          <BiUserCircle></BiUserCircle>
        </div>
        <div className={styles.comment_right_part}>
            <div className={styles.comment_content}>
              <div className={styles.comment_author}>{comment.username}</div>
              <div>{createdAt}</div>
            </div>
            {!isEditing && <div className={styles.comment_text}>{comment.body}</div>}
            {isEditing && (
              <CommentForm 
              submitLabel="Update"
              hasCancelButton
              initialText = {comment.body}
              handleSubmit ={(text) => {
                updateComment(text, comment.id)
              }}
              handleCancel = {()=> {
                setActiveComment(null)
              }}
              ></CommentForm>
            )}
            <div className={styles.comment_actions}>
              {canReply && <div className={styles.comment_action} onClick={() => setActiveComment({
                id: comment.id,
                type: "replying"
              })}>Reply</div>}
              {canEdit && <div className={styles.comment_action} onClick={() => setActiveComment({
                id: comment.id,
                type: "editing"
              })}>Edit</div>}
              {canDelete && <div className={styles.comment_action} onClick={()=> deleteComment(comment.id)}>Delete</div>}
            </div>
            {isReplying && (
              <CommentForm 
              submitLabel="Reply" 
              handleSubmit={(text) => addComment(text, replyId)}></CommentForm>
            )}
            {replies.length > 0 && (
              <div className={styles.replies}>
                {replies.map((reply) => (
                  <Comment 
                  comment={reply} 
                  key={reply.id} 
                  replies={[]}
                  addComment={addComment}
                  currentUserId={currentUserId} 
                  deleteComment={deleteComment}
                  updateComment={updateComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment} 
                  parentId={comment.id}
                  ></Comment>
                ))}
              </div>
            )}
        </div>
    </div>
  )
}

export default Comment
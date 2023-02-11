import React, { useEffect, useState } from 'react';
import { getComments as getCommentsAPI, createComment as createCommentAPI, deleteComment as deleteCommentAPI, updateComment as updateCommentAPI } from './api';
import styles from "./Comment.module.css";
import Comment from "./Comment";
import CommentForm from './CommentForm';

function Comments({ currentUserId }) {
  const [ backendComments, setBackendComments ] = useState([]);
  const [activeComment, setActiveComment] = useState(null)
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) => {
    return backendComments
    .filter((backendComment) => backendComment.parentId === commentId)
    .sort(
      (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  const addComment = (text, parentId) => {
    console.log("addComment" + text, parentId);
    createCommentAPI(text, parentId).then(comment => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    })
  }

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure that you want to remove comment?")) {
      deleteCommentAPI(commentId).then(()=> {
        const updatedBackendComments = backendComments.filter((backendComment) => backendComment.id !== commentId);
        setBackendComments(updatedBackendComments);
      }
      )
    }
  }

  const updateComment = (text, commentId) => {
    updateCommentAPI(text, commentId).then(()=> {
      const updatedBackendComments = backendComments.map(backendComment => {
        if(backendComment.id === commentId) {
          console.log({...backendComment, body: text})
          return {...backendComment, body: text}
        }
        return backendComment
      });
      setBackendComments(updatedBackendComments)
      setActiveComment(null)
    })
  }
  
  useEffect(() => {
    getCommentsAPI().then((data) => {
      setBackendComments(data);
    })
  }, [])
  return (
    <div className={styles.comments}>
        <h3 className={styles.comments_title}>Comments</h3>
        <div className={styles.comment_form_title}>Write comment</div>
        <CommentForm submitLabel="Write" handleSubmit={addComment}></CommentForm>
        <div className={styles.comment_container}>
          {rootComments.map((rootComment, index) => {
            return (
              <>
              <Comment key={rootComment.id} 
                      comment={rootComment} 
                      replies={getReplies(rootComment.id)}
                      currentUserId={currentUserId}
                      updateComment={updateComment}
                      deleteComment={deleteComment}
                      activeComment={activeComment}
                      setActiveComment={setActiveComment}
                      addComment={addComment}
                      ></Comment>
              </>
            )
          }) }
        </div>
    </div>
  )
}

export default Comments
import React, { useState } from 'react'
import styles from "./Comment.module.css";

function CommentForm({ handleSubmit, submitLabel, hasCancelButton = false, initialText = '', handleCancel}) {
  const [text, setText] = useState(initialText);
  const isTextareaDisable = text.length === 0;
    const onSubmit = event => {
      event.preventDefault();
      handleSubmit(text);
      setText("");
    }
  return (
    <form onSubmit={onSubmit}>
      <textarea 
        className={styles.comment_form_textarea} 
        value={text} onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className={styles.comment_form_button} disabled={isTextareaDisable}>{submitLabel}</button>
        {hasCancelButton && (
          <button
          type='button'
          className={`${styles.comment_form_button} ${styles.comment_form_cancel_button}`}
          onClick={handleCancel}
          >Cancel</button>
        )}
    </form>
  )
}

export default CommentForm
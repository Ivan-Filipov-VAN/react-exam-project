import styles from './CommentCard.module.css';

export const CommentCard = (comment) => {
    console.log(comment);
    return (
        <div className={styles['comment-card']}>
            <div className={styles['coment-auth']}>
                <img src={comment.author.imageUrl} alt={comment.author.email} className={styles['coment-img']} />
                {/* <h3>{comment.author.imageUrl}</h3> */}
                <p className={styles['coment-email']}>{comment.author.email}</p>
            </div>
            <div className={styles['comment-comment']}>
                <p>{comment.comment}</p>
            </div>
        </div>
    );
};
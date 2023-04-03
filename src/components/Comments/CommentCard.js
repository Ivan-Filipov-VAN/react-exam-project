export const CommentCard = (comment) => {
    console.log(comment);
    return(
        <div className='comment-card'>
            <h3>----------------</h3>
            <h3>{comment._id}</h3>
            <h3>{comment.author._id}</h3>
            <h3>{comment.author.email}</h3>
            <h3>{comment.comment}</h3>
            <h3>----------------</h3>
        </div>
    );
};
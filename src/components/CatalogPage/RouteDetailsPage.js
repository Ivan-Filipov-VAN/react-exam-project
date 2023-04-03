import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { RouteContext } from '../../contexts/RouteContext';
import { Addcomment } from '../Comments/AddComment';
import * as routeService from '../../services/routeService';
import * as commentService from '../../services/commentService';
import { CommentCard } from '../Comments/CommentCard';



export const RouteDetailsPage = () => {

    const { routeId } = useParams();
    const [route, setRoute] = useState({});
    const { userId, userEmail, isAuthenticated } = useContext(AuthContext);
    const { onDeleteRoute } = useContext(RouteContext);

    const [showAddComment, seStshowAddComment] = useState(false);

    useEffect(() => {

        Promise.all([
            routeService.getOneRoute(routeId),
            commentService.getAllComments(routeId),
        ])
            .then(([routeData, comments]) => {
                console.log(routeData)
                console.log(comments)
                setRoute({
                    ...routeData,
                    comments,
                })
            })

        // getOneRoute(routeId)
        //     .then(result => {
        //         setRoute(result);
        //     })
    }, [routeId]);

    console.log(route);

    const isOwner = userId === route._ownerId;

    const onAddComment = async (data) => {
        const response = await commentService.createComment(routeId, data.comment);
        seStshowAddComment(false);

        setRoute(state => ({
            ...state,
            comments: [
                ...state.comments, {
                    ...response,
                    author: {
                        //todo
                        _id: userId,
                        email: userEmail,
                    }
                }
            ]
        }));
    };

    const onCommentAddClick = () => {
        seStshowAddComment(true);
    }

    const onClose = () => {
        seStshowAddComment(false);
    }

    return (
        <>
            {showAddComment && <Addcomment show={showAddComment} onClose={onClose} onAddComment={onAddComment} />}

            <h2>DETAILS PAGE</h2>
            <h4>{route.title}</h4>
            <h4>{route.description}</h4>
            <h4>{route.imageUrl}</h4>
            <h4>{route._ownerId}</h4>

            {isOwner && (
                <div className='buttons'>
                    <Link to={`/catalog/${route._id}/edit`} className="btn-pro">Edit</Link>
                    <button onClick={() => onDeleteRoute(route._id)} className="btn-pro">Delete</button>
                </div>
            )}

            {(!isOwner && isAuthenticated) && (
                <div className='buttons'>
                    <button className="btn-pro" onClick={onCommentAddClick} >Comment</button>
                </div>
            )}

            {route.comments && <h2>Comments:</h2>}

            {route.comments &&
                route.comments.map(x => <CommentCard key={x._id} {...x} />)
            }

            {!route.comments?.length && <h2>No Comments !</h2>}

        </>
    );
};
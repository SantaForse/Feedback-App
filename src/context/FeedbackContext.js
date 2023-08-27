import {v4 as uuidv4} from 'uuid'
import { createContext, useState } from "react";


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is the first feedback item',
            rating: 10
        },
        {
            id: 2,
            text: 'This is the second feedback item',
            rating: 9
        },
        {
            id: 3,
            text: 'This is the third feedback item',
            rating: 8
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState ({
        item: {},
        edit: false,
        
    })

    //add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    //delete feedback
    const deleteFeedback= (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    //update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
        )

    }


    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item, 
            edit: true,
        })
    }

    return <FeedbackContext.Provider value ={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext 
import { createContext, useContext, useEffect, useReducer, useState } from "react"
import React from 'react'
import { UserContext } from "../../index";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { profiles } = useContext(UserContext)

    const INITIAL_STATE = { 
        chatID:"null",
        user:{}
    }

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: profiles.uid > action.payload.uid 
                    ? profiles.uid + action.payload.uid 
                    : action.payload.uid + profiles.uid
                };
            default:
                return state
        }
    }
    
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )

};
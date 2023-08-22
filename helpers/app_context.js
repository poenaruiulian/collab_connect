import {createContext, useState} from 'react';

export const AppContext = createContext({
    admin:false,
    setAdmin:()=>{}
})
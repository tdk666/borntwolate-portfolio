import { createContext, useState, useContext, type ReactNode } from 'react';

interface DarkroomContextType {
    isDarkroom: boolean;
    toggleDarkroom: () => void;
}

const DarkroomContext = createContext<DarkroomContextType | undefined>(undefined);

export const DarkroomProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkroom, setIsDarkroom] = useState(false);

    const toggleDarkroom = () => {
        setIsDarkroom(prev => !prev);
    };

    return (
        <DarkroomContext.Provider value={{ isDarkroom, toggleDarkroom }}>
            {children}
        </DarkroomContext.Provider>
    );
};

export const useDarkroom = () => {
    const context = useContext(DarkroomContext);
    if (context === undefined) {
        throw new Error('useDarkroom must be used within a DarkroomProvider');
    }
    return context;
};

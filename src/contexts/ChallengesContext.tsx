import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experieceToNextLevel: number;

    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    
    level: number;
    currentExperience: number; 
    challengesCompleted: number; 
    
}

export const ChallengesContext = createContext({} as ChallengesContextData);

//Spread operator pass the non expressed atribute being accessed as an object
export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps) {

    //if there aren't values on these variables, it assumes the literal
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false)

    const experieceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        // cookies -> only string
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
        
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level+1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setLevel(level+1);
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        // new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo deafio 🎉',{
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge) 
            return;
        
        const { amount } = activeChallenge;
        
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experieceToNextLevel){
            finalExperience = finalExperience - experieceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                levelUp, 
                startNewChallenge, 
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
                currentExperience, 
                challengesCompleted,
                activeChallenge,            
                experieceToNextLevel
            }}>
            {children}
            { isLevelUpModalOpen &&
                <LevelUpModal/>
            }
        </ChallengesContext.Provider>
    )
}


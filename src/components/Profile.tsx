import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
        
    const { level } = useContext(ChallengesContext);

    return(


        <div className={styles.profileContainer}>
            <img src="https://github.com/viniciusquare.png" alt="Vinicius Quadrado"/>
            <div>
                <strong>Vinicius Quadrado</strong>

                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'

import { ChallengeBox } from '../components/ChallengeBox'

import Head from 'next/head'
import {GetServerSideProps} from 'next'

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

interface HomeProps {
	level: number;
	currentExperience: number; 
	challengesCompleted: number; 
}

export default function Home({level, currentExperience, challengesCompleted}: HomeProps) {
  return (
		<ChallengesProvider 
			level={level} 
			currentExperience={currentExperience} 
			challengesCompleted={challengesCompleted} 
		>
			<div className={styles.container}>
				<Head>
					<title> Início | move.it </title>
				</Head>
				
				<ExperienceBar/>

				<CountdownProvider>
					<section>
						<div >
							<Profile/>
							<CompletedChallenges/>
							<Countdown/>
						</div>
						<div>
							<ChallengeBox/>
						</div>
					</section>
				</CountdownProvider>
			</div>
		</ChallengesProvider>
  	)
}

// will run before nextJS midleware return the page
	// Using context to get client's cookies
export const getServerSideProps: GetServerSideProps = async(ctx) => {
	const { 
		level, 
		currentExperience, 
		challengesCompleted 
	} = ctx.req.cookies;
	
	return{
		props: {
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted)
		}
	}
}


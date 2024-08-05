import React, { useContext } from 'react';
import Header from '../components/header';
import { UsersContext } from '../contexts/users-context';
import styles from './home-page.module.scss';

export default function HomePage() {
  const userContext = useContext(UsersContext);

  return (<>
    <Header />
    <main className={styles['main-contents']}>
      <p>Welcome to the home of {userContext.currentGroup?.name}</p>
      <p>Our group has {userContext.currentGroup?.numberOfAnimals} pets!</p>
      <p>{userContext.currentGroup?.motto}</p>
    </main>
  </>);
}

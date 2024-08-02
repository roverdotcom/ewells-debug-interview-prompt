import React, { ChangeEventHandler, useCallback, useContext, useMemo } from 'react';
import { UsersContext } from '../contexts/users-context';
import styles from './header.module.scss';

export default function Header() {
  const usersContext = useContext(UsersContext);

  // Change event handlers
  const handleUserSelect = useCallback<ChangeEventHandler<HTMLSelectElement>>(({ target }) => {
    usersContext.setCurrentUser(parseInt(target.value));
  }, [usersContext]);

  const handleGroupSelect = useCallback<ChangeEventHandler<HTMLSelectElement>>(({ target }) => {
    usersContext.setCurrentGroup(parseInt(target.value));
  }, [usersContext]);
  
  // Map user and group options to JSX elements
  const userOptions = useMemo<JSX.Element[]>(() => {
    return usersContext.users.map((user) => (
      <option value={user.id} key={`UserOption_${user.id}`}>{user.name}</option>
    ));
  }, [usersContext.users]);
  
  const groupOptions = useMemo<JSX.Element[]>(() => {
    return usersContext.userGroups.map((group) => (
      <option value={group.id} key={`GroupOption${group.id}`}>{group.name}</option>
    ));
  }, [usersContext.userGroups]);

  return (
    <header className={styles['header']}>
      <span>User: </span>
      <select className={styles['user-select']} onChange={(e) => handleUserSelect(e)} value={usersContext.currentUser?.id}>
        {userOptions}
      </select>
      <span>Group: </span>
      <select className={styles['group-select']} onChange={(e) => handleGroupSelect(e)} value={usersContext.currentGroup?.id}>
        {groupOptions}
      </select>
    </header>
  );
}

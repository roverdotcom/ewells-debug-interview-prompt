import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Group from '../../types/models/Groups';
import User from '../../types/models/Users';

export interface UsersContextObject {
  users: User[],
  currentUser: User | null,
  userGroups: Group[],
  currentGroup: Group | null,
  setCurrentUser: (userId: number) => void,
  setCurrentGroup: (groupId: number) => void
}
export const UsersContext = createContext<UsersContextObject>({
  users: [],
  currentUser: null,
  userGroups: [],
  currentGroup: null,
  setCurrentUser: () => console.error('Oops, setCurrentUser hasn\'t been initialized yet!'),
  setCurrentGroup: () => console.error('Oops, setCurrentGroup hasn\'t been initialized yet!'),
});


interface UsersContextProviderProps {
  children: ReactNode
}
export function UsersContextProvider({ children }: UsersContextProviderProps) {
  const [ users, __setUsers ] = useState<User[]>([]);
  const [ currentUser, __setCurrentUser ] = useState<User | null>(null);
  const [ userGroups, __setUserGroups ] = useState<Group[]>([]);
  const [ currentGroup, __setCurrentGroup ] = useState<Group | null>(null);

  const setCurrentUser = useCallback((userId: number) => {
    const newUser = users.find((user) => userId === user.id);
    if (!newUser) return console.error('Couldn\'t find user to set current user');
    else return __setCurrentUser(newUser);
  }, [users]);

  const setCurrentGroup = useCallback((groupId: number) => {
    const newGroup = userGroups.find((group) => groupId === group.id);
    if (!newGroup) return console.error('Couldn\'t find group to set current group');
    else return __setCurrentGroup(newGroup);
  }, [userGroups]);

  const contextValue = useMemo<UsersContextObject>(() => ({
    users,
    currentUser,
    userGroups,
    currentGroup,
    setCurrentUser,
    setCurrentGroup
  }), [users, currentUser, userGroups, currentGroup, setCurrentUser, setCurrentGroup]);

  // Initialize users array on init and set current user as first user
  useEffect(() => {
    getAllUsers().then((users) => {
      __setUsers(users);
      __setCurrentUser(users[0]);
    });
  }, []);

  // When current user changes, also update user groups
  useEffect(() => {
    if (!currentUser) return;
    __setUserGroups([]);
    __setCurrentGroup(null);
    getUserGroups(currentUser.id).then((groups) => {
      __setUserGroups(groups);
      __setCurrentGroup(groups[0]);
    });
  }, [currentUser]);

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
}

async function getAllUsers(): Promise<User[]> {
  return await fetch('/api/users').then((res) => res.json());
}

async function getUserGroups(userId: number): Promise<Group[]> {
  const groups: Group[] = await fetch(`/api/groups?userId=${userId}`).then((res) => res.json());
  return groups.map((group) => ({
    ...group,
    groupKey: group.groupKey.toLowerCase()
  }));
}

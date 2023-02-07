import React, { useCallback, useState } from "react"
import { UserGroup } from "./constants"

type UserGroupContextType = {
    group: UserGroup
    showCoordinatorControls: boolean
    setGroup: (newGroupName: UserGroup) => void
}

const groupKey = "user-group"
const updateLocalStorage = (newGroupName: UserGroup) => localStorage.setItem(groupKey, newGroupName)

// careful here as nextjs will trip over it on ssr
const group =
    (typeof localStorage !== "undefined" && localStorage.getItem(groupKey)) ||
    UserGroup.BoatOperator

const showCoordinatorControls = (group?: unknown) => group === UserGroup.OfficeCoordinator

export const defaultUserGroupContext = {
    group,
    showCoordinatorControls: showCoordinatorControls(group),
    setGroup: () => undefined,
} as UserGroupContextType

export const UserGroupContext = React.createContext<UserGroupContextType>(defaultUserGroupContext)

type UserGroupContextProviderProps = {
    children: JSX.Element | null
}

export function UserGroupContextProvider({ children }: UserGroupContextProviderProps) {
    const [value, setValue] = useState(defaultUserGroupContext)

    const setGroup = useCallback((newGroupName: UserGroup) => {
        updateLocalStorage(newGroupName)
        setValue((v) => ({
            ...v,
            group: newGroupName,
            showCoordinatorControls: showCoordinatorControls(newGroupName),
        }))
    }, [])

    return (
        <UserGroupContext.Provider value={{ ...value, setGroup }}>
            {children}
        </UserGroupContext.Provider>
    )
}

import { useLocalStorage } from "@/tools/useLocalStorage"
import { UserGroup } from "./constants"

export function useStoredUserGroup(): readonly [UserGroup, (value: UserGroup) => void] {
    const storageTools = useLocalStorage<UserGroup>("user-group", UserGroup.BoatOperator)

    return storageTools
}

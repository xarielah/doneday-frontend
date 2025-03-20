import { Avatar, Text } from "@vibe/core";

export default function ActivityDynMem({ prev, next }) {
    const { action, user } = detectUserChange(prev, next);

    return <div className="activity-dyn-mem elipsis">
        {user.avatar && <Avatar type="img" src={user.avatar} size="small" className="keep-aspect " />}
        {!user.avatar && <Avatar type="text" backgroundColor={user.color} text={user.name.substring(0, 1)} size="small" className="keep-aspect " />}
        <Text type="text2">{user.name} was {action}.</Text>
    </div>
}

function detectUserChange(previousArray, currentArray) {
    // Determine which array is longer to figure out if it's an addition or removal
    const isAddition = currentArray.length > previousArray.length;
    const isRemoval = currentArray.length < previousArray.length;

    if (!isAddition && !isRemoval) {
        return { action: "no change", user: null };
    }

    // Create a map to store users by a unique identifier (name in this case)
    const previousUsers = new Map();
    const currentUsers = new Map();

    previousArray.forEach(user => previousUsers.set(user.name, user));
    currentArray.forEach(user => currentUsers.set(user.name, user));

    let changedUser = null;

    if (isAddition) {
        // Find the user that exists in current but not in previous
        for (const [name, user] of currentUsers) {
            if (!previousUsers.has(name)) {
                changedUser = user;
                break;
            }
        }

        return { action: "added", user: changedUser };
    }

    if (isRemoval) {
        // Find the user that exists in previous but not in current
        for (const [name, user] of previousUsers) {
            if (!currentUsers.has(name)) {
                changedUser = user;
                break;
            }
        }

        return { action: "removed", user: changedUser };
    }
}
const allowedUsers: string[] = [
    "steam:11000010a0b1c2d3"
];

onNet("checkNoclipPermission", () => {
    const source = global.source;
    const playerID = GetPlayerIdentifiers(source)[0];
    const isAllowed = allowedUsers.includes(playerID);
    emitNet("noclip:allowed", source, isAllowed);
});

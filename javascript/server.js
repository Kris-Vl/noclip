"use strict";
const allowedUsers = [
    "steam:11000010a0b1c2d3"
];
onNet("checkNoclipPermission", (playerSource) => {
    const playerIdentifiers = getPlayerIdentifiers(playerSource);
    if (playerIdentifiers.length > 0) {
        for (const id of allowedUsers) {
            if (playerIdentifiers.includes(id)) {
                emitNet("noclip:allowed", playerSource, true);
                return;
            }
        }
    }
    emitNet("noclip:allowed", playerSource, false);
});
function getPlayerIdentifiers(playerSource) {
    const identifiers = [];
    const numIdentifiers = GetNumPlayerIdentifiers(playerSource);
    for (let i = 0; i < numIdentifiers; i++) {
        identifiers.push(GetPlayerIdentifier(playerSource, i));
    }
    return identifiers;
}
//# sourceMappingURL=server.js.map

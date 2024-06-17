"use strict";
let noclip = false;
let noclip_speed = 1.0;
let noclip_started = false;
function getPosition() {
    const [x, y, z] = GetEntityCoords(PlayerPedId(), true);
    return [x, y, z];
}
function getCamDirection() {
    const heading = GetGameplayCamRelativeHeading() + GetEntityHeading(PlayerPedId());
    const pitch = GetGameplayCamRelativePitch();
    let x = -Math.sin(heading * Math.PI / 180.0);
    let y = Math.cos(heading * Math.PI / 180.0);
    let z = Math.sin(pitch * Math.PI / 180.0);
    const len = Math.sqrt(x * x + y * y + z * z);
    if (len !== 0) {
        x /= len;
        y /= len;
        z /= len;
    }
    return [x, y, z];
}
function isNoclip() {
    return noclip;
}
onNet("noclip:allowed", (allowed) => {
    noclip = allowed;
    if (noclip_started) {
        if (noclip) {
            emit("chat:addMessage", { args: ["Noclip enabled. Press N to toggle noclip mode or press B to disable noclip."] });
        }
        else {
            emit("chat:addMessage", { args: ["Noclip disabled"] });
        }
    }
    emitNet("toggleNoclip", noclip, noclip_speed);
});
onNet("noclip:denied", () => {
    emit("chat:addMessage", { args: ["You do not have permission to use noclip"] });
});
setTick(() => {
    if (noclip) {
        let speed = noclip_speed;
        if (IsControlPressed(0, 21)) {
            speed = 3.0;
        }
        else {
            speed = 1.5;
        }
        emitNet("updateSpeed", speed);
    }
});
setTick(() => {
    if (IsControlJustReleased(0, 249)) {
        emitNet("checkNoclipPermission", global.source);
        noclip_started = true;
    }
    if (IsControlJustReleased(0, 305)) {
        noclip = false;
        emit("chat:addMessage", { args: ["Noclip disabled"] });
    }
    if (noclip) {
        const ped = PlayerPedId();
        let [x, y, z] = getPosition();
        let [dx, dy, dz] = getCamDirection();
        const speed = noclip_speed;
        SetEntityVisible(PlayerPedId(), false, 0);
        SetEntityVelocity(ped, 0.0001, 0.0001, 0.0001);
        if (IsControlPressed(0, 32)) {
            x += speed * dx;
            y += speed * dy;
            z += speed * dz;
        }
        if (IsControlPressed(0, 33)) {
            x -= speed * dx;
            y -= speed * dy;
            z -= speed * dz;
        }
        if (IsControlPressed(0, 34)) {
            x -= 1;
        }
        if (IsControlPressed(0, 35)) {
            x += 1;
        }
        if (IsControlPressed(0, 44)) {
            z += 1;
        }
        if (IsControlPressed(0, 38)) {
            z -= 1;
        }
        SetEntityCoordsNoOffset(ped, x, y, z, true, true, true);
        SetEntityCollision(ped, false, false);
        FreezeEntityPosition(ped, true);
    }
    else {
        const playerPed = PlayerPedId();
        SetEntityCollision(playerPed, true, true);
        FreezeEntityPosition(playerPed, false);
    }
});
//# sourceMappingURL=client.js.map

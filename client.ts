let noclip: boolean = false;
let noclip_speed: number = 1.0;
let noclip_started: boolean = false;

function getPosition(): [number, number, number] {
    const [x, y, z] = GetEntityCoords(PlayerPedId(), true);
    return [x, y, z];
}

function getCamDirection(): [number, number, number] {
    const heading: number = GetGameplayCamRelativeHeading() + GetEntityHeading(PlayerPedId());
    const pitch: number = GetGameplayCamRelativePitch();

    let x: number = -Math.sin(heading * Math.PI / 180.0);
    let y: number = Math.cos(heading * Math.PI / 180.0);
    let z: number = Math.sin(pitch * Math.PI / 180.0);

    const len: number = Math.sqrt(x * x + y * y + z * z);
    if (len !== 0) {
        x /= len;
        y /= len;
        z /= len;
    }

    return [x, y, z];
}

function isNoclip(): boolean {
    return noclip;
}

onNet("noclip:allowed", (allowed: boolean) => {
    noclip = allowed;
    if (noclip_started) {
        if (noclip) {
            emit("chat:addMessage", { args: ["Noclip enabled. Press N to toggle noclip mode or press B to disable noclip."] });
        } else {
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
        let speed: number = noclip_speed;
        if (IsControlPressed(0, 21)) {
            speed = 3.0;
        } else {
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
        const ped: number = PlayerPedId();
        let [x, y, z]: [number, number, number] = getPosition();
        let [dx, dy, dz]: [number, number, number] = getCamDirection();
        const speed: number = noclip_speed;

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
    } else {
        const playerPed: number = PlayerPedId();
        SetEntityCollision(playerPed, true, true);
        FreezeEntityPosition(playerPed, false);
    }
});

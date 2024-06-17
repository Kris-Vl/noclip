local noclip = false
local noclip_speed = 1.0
local noclip_started = false

function getPosition()
    local x, y, z = table.unpack(GetEntityCoords(GetPlayerPed(-1), true))
    return x, y, z
end

function getCamDirection()
    local heading = GetGameplayCamRelativeHeading() + GetEntityHeading(GetPlayerPed(-1))
    local pitch = GetGameplayCamRelativePitch()

    local x = -math.sin(heading * math.pi / 180.0)
    local y = math.cos(heading * math.pi / 180.0)
    local z = math.sin(pitch * math.pi / 180.0)

    local len = math.sqrt(x * x + y * y + z * z)
    if len ~= 0 then
        x = x / len
        y = y / len
        z = z / len
    end

    return x, y, z
end

function isNoclip()
    return noclip
end

RegisterNetEvent("noclip:allowed")
AddEventHandler("noclip:allowed", function(allowed)
    noclip = allowed
    if noclip_started then
        if noclip then
            TriggerEvent("chat:addMessage", { args = { "Noclip enabled. Press N to toggle noclip mode or press B to disable noclip." } })
        else
            TriggerEvent("chat:addMessage", { args = { "Noclip disabled" } })
        end
    end
    SendNUIMessage({
        type = "toggleNoclip",
        status = noclip,
        speed = noclip_speed
    })
end)

RegisterNetEvent("noclip:denied")
AddEventHandler("noclip:denied", function()
    TriggerEvent("chat:addMessage", { args = { "You do not have permission to use noclip" } })
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100)
        if noclip then
            local speed = noclip_speed
            if IsControlPressed(0, 21) then
                speed = 3.0
            else
                speed = 1.5
            end
            SendNUIMessage({
                type = "updateSpeed",
                speed = speed
            })
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)

        if IsControlJustReleased(0, 249) then -- 249 is the control code for N key
            TriggerServerEvent("checkNoclipPermission")
            noclip_started = true
        end

        if IsControlJustReleased(0, 305) then -- 305 is the control code for B key
            noclip = false
            TriggerEvent("chat:addMessage", { args = { "Noclip disabled" } })
        end

        if noclip then
            local ped = GetPlayerPed(-1)
            local x, y, z = getPosition()
            local dx, dy, dz = getCamDirection()
            local speed = noclip_speed

            SetEntityVisible(GetPlayerPed(-1), false, 0)
            SetEntityVelocity(ped, 0.0001, 0.0001, 0.0001)

            if IsControlPressed(0, 32) then -- W
                x = x + speed * dx
                y = y + speed * dy
                z = z + speed * dz
            end

            if IsControlPressed(0, 33) then -- S
                x = x - speed * dx
                y = y - speed * dy
                z = z - speed * dz
            end

            if IsControlPressed(0, 34) then -- A
                x = x - 1
            end

            if IsControlPressed(0, 35) then -- D
                x = x + 1
            end

            if IsControlPressed(0, 44) then -- Q
                z = z + 1
            end

            if IsControlPressed(0, 38) then -- E
                z = z - 1
            end

            SetEntityCoordsNoOffset(ped, x, y, z, true, true, true)
            SetEntityCollision(ped, false, false)
            FreezeEntityPosition(ped, true)
        else
            local playerPed = PlayerPedId()
            SetEntityCollision(playerPed, true, true)
            FreezeEntityPosition(playerPed, false)
        end
    end
end)

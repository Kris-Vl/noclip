local noclip = false
local noclip_speed = 1.0

RegisterNetEvent("noclip:allowed")
AddEventHandler("noclip:allowed", function()
    noclip = not noclip
    if noclip then
        TriggerEvent("chat:addMessage", { args = { "Noclip enabled" } })
    else
        TriggerEvent("chat:addMessage", { args = { "Noclip disabled" } })
    end
    SendNUIMessage({
        type = "toggleNoclip",
        status = noclip,
        speed = 0.0,
        instructions = "Use W, A, S, D to move, Q to go up, E to go down"
    })
end)

RegisterNetEvent("noclip:denied")
AddEventHandler("noclip:denied", function()
    TriggerEvent("chat:addMessage", { args = { "You do not have permission to use noclip" } })
end)

local previousCoords = GetEntityCoords(PlayerPedId(), true)
local currentCoords = previousCoords
local lastCheck = GetGameTimer()

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)

        if IsControlJustReleased(0, 289) then
            TriggerServerEvent("checkPermission")
        end
        
        if IsControlJustReleased(0, 249) and noclip ~= nil then
            noclip = not noclip
            if noclip then
                TriggerEvent("chat:addMessage", { args = { "Noclip enabled" } })
            else
                TriggerEvent("chat:addMessage", { args = { "Noclip disabled" } })
            end
            SendNUIMessage({
                type = "toggleNoclip",
                status = noclip,
                speed = 0.0,
                instructions = noclip and "Use W, A, S, D to move, Q to go up, E to go down" or ""
            })
        end

        if noclip then
            local playerPed = PlayerPedId()
            local x, y, z = table.unpack(GetEntityCoords(playerPed, true))
            local dx, dy, dz = 0.0, 0.0, 0.0

            if IsControlPressed(0, 32) then -- W
                dx = dx + noclip_speed
            end
            if IsControlPressed(0, 33) then -- S
                dx = dx - noclip_speed
            end
            if IsControlPressed(0, 34) then -- A
                dy = dy + noclip_speed
            end
            if IsControlPressed(0, 35) then -- D
                dy = dy - noclip_speed
            end
            if IsControlPressed(0, 44) then -- Q
                dz = dz + noclip_speed
            end
            if IsControlPressed(0, 38) then -- E
                dz = dz - noclip_speed
            end

            local heading = GetEntityHeading(playerPed)
            local radHeading = math.rad(heading)
            local cosH = math.cos(radHeading)
            local sinH = math.sin(radHeading)

            x = x + dx * cosH - dy * sinH
            y = y + dx * sinH + dy * cosH
            z = z + dz

            SetEntityCoordsNoOffset(playerPed, x, y, z, true, true, true)
            SetEntityCollision(playerPed, false, false)
            FreezeEntityPosition(playerPed, true)
        else
            local playerPed = PlayerPedId()
            SetEntityCollision(playerPed, true, true)
            FreezeEntityPosition(playerPed, false)
        end
        
        currentCoords = GetEntityCoords(PlayerPedId(), true)
        local currentTime = GetGameTimer()
        local deltaTime = (currentTime - lastCheck) / 1000
        lastCheck = currentTime
        
        local velocity = Vdist(previousCoords.x, previousCoords.y, previousCoords.z, currentCoords.x, currentCoords.y, currentCoords.z) / deltaTime
        local speed = math.floor(velocity * 100 + 0.5) / 100
        
        -- Send NUI message to update UI
        SendNUIMessage({
            type = "updateSpeed",
            speed = speed
        })

        previousCoords = currentCoords
    end
end)

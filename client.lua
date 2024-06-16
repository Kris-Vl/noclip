local noclip = false

RegisterNetEvent("noclip:allowed")
AddEventHandler("noclip:allowed", function()
    noclip = not noclip
    if noclip then
        TriggerEvent("chat:addMessage", { args = { "Noclip enabled" } })
    else
        TriggerEvent("chat:addMessage", { args = { "Noclip disabled" } })
    end
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
        
        currentCoords = GetEntityCoords(PlayerPedId(), true)
        local currentTime = GetGameTimer()
        local deltaTime = (currentTime - lastCheck) / 1000
        lastCheck = currentTime
        
        local velocity = Vdist(previousCoords.x, previousCoords.y, previousCoords.z, currentCoords.x, currentCoords.y, currentCoords.z) / deltaTime
        local speed = math.floor(velocity * 100 + 0.5) / 100
        
        DrawText2D(0.5, 0.9, 0.35, "Current Speed: " .. speed)
        
        previousCoords = currentCoords
    end
end)

function DrawText2D(x, y, scale, text)
    SetTextFont(0)
    SetTextProportional(1)
    SetTextScale(scale, scale)
    SetTextColour(255, 255, 255, 255)
    SetTextDropShadow(0, 0, 0, 0, 255)
    SetTextEdge(1, 0, 0, 0, 255)
    SetTextDropShadow()
    SetTextOutline()
    SetTextEntry("STRING")
    AddTextComponentString(text)
    DrawText(x, y)
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if noclip then
            SendNUIMessage({
                type = "toggleNoclip",
                status = noclip
            })
        else
            SendNUIMessage({
                type = "toggleNoclip",
                status = false
            })
        end
    end
end)

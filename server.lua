local allowedUsers = {
    "steam:11000010a0b1c2d3"
}

RegisterServerEvent("checkPermission")
AddEventHandler("checkPermission", function()
    local source = source
    local playerID = GetPlayerIdentifiers(source)[1]
    for _, id in pairs(allowedUsers) do
        if id == playerID then
            TriggerClientEvent("noclip:allowed", source)
            return
        end
    end
    TriggerClientEvent("noclip:denied", source)
end)

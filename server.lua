local allowedUsers = {
    "steam:11000010a0b1c2d3",
    "steam:11000010a4e5f6g7"
}

RegisterCommand("checkPermission", function(source, args, rawCommand)
    local playerID = GetPlayerIdentifier(source, 0)
    for _, id in pairs(allowedUsers) do
        if id == playerID then
            TriggerClientEvent("noclip:allowed", source)
            return
        end
    end
    TriggerClientEvent("noclip:denied", source)
end, false)

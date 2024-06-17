declare function GetEntityCoords(entity: number, alive: boolean): [number, number, number];
declare function PlayerPedId(): number;
declare function GetGameplayCamRelativeHeading(): number;
declare function GetEntityHeading(entity: number): number;
declare function GetGameplayCamRelativePitch(): number;
declare function IsControlPressed(inputGroup: number, control: number): boolean;
declare function IsControlJustReleased(inputGroup: number, control: number): boolean;
declare function SetEntityVisible(entity: number, toggle: boolean, unk: number): void;
declare function SetEntityVelocity(entity: number, x: number, y: number, z: number): void;
declare function SetEntityCoordsNoOffset(entity: number, x: number, y: number, z: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): void;
declare function SetEntityCollision(entity: number, toggle: boolean, keepPhysics: boolean): void;
declare function FreezeEntityPosition(entity: number, toggle: boolean): void;
declare function SendNUIMessage(message: object): void;
declare function TriggerEvent(eventName: string, ...args: any[]): void;
declare function TriggerServerEvent(eventName: string, ...args: any[]): void;
declare function RegisterNetEvent(eventName: string): void;
declare function AddEventHandler(eventName: string, callback: (...args: any[]) => void): void;
declare function emitNet(eventName: string, ...args: any[]): void;
declare function emit(eventName: string, ...args: any[]): void;
declare function onNet(eventName: string, callback: (...args: any[]) => void): void;
declare function setTick(callback: () => void): void;
declare function GetPlayerPed(player: number): number;
declare function GetNumPlayerIdentifiers(player: number): number;
declare function GetPlayerIdentifier(player: number, identifier: number): string;
declare var global: any;

declare namespace Citizen {
    function CreateThread(callback: () => void): void;
    function Wait(ms: number): void;
}

declare var source: number;

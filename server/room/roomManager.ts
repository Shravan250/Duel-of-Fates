import type { Server } from "socket.io";
import type { Player } from "../matchmaking/queue";
import { generateRoomId } from "../utils/generateRoomId";
import { MatchRoom } from "./matchRoom";

class RoomManager{
    private io:Server|null;
    private rooms:Map<string,MatchRoom>;
    private playerRoomMap:Map<string,string>;
    constructor(){
        this.io=null;
        this.rooms=new Map<string,MatchRoom>();
        this.playerRoomMap=new Map<string,string>();
    }

    public initialize(io:Server){
        this.io=io;
    }

    public createRoom(player1:Player,player2:Player):string|null{
        if(!this.io) return null;
        let roomId=generateRoomId();
        while(this.rooms.has(roomId)){
            roomId=generateRoomId();
        }

        this.playerRoomMap.set(player1.id,roomId);
        this.playerRoomMap.set(player2.id,roomId);
        const room=new MatchRoom(roomId,this.io);
        this.rooms.set(roomId,room);
        room.join(player1);
        room.join(player2);
        return roomId;
    }

    public getRoom(roomId:string):MatchRoom|null{
        return this.rooms.get(roomId)||null;
    }

    public getRoomByPlayer(playerId:string):string|null{
        return this.playerRoomMap.get(playerId)||null;
    }

    public removeRoom(roomId:string){
        const room=this.rooms.get(roomId);
        const players=room?.players
        if(room){
            room.destroy();
            this.rooms.delete(roomId);
        }
        if(players){
            players.player1&&this.playerRoomMap.delete(players.player1.id);
            players.player2&&this.playerRoomMap.delete(players.player2.id);
        }
    }
}


export const roomManager=new RoomManager();
import { generateRoomId } from "../utils/generateRoomId";
import { MatchRoom } from "./matchRoom";

class RoomManager{
    private rooms:Map<string,MatchRoom>;
    private playerRoomMap:Map<string,string>;
    constructor(){
        this.rooms=new Map<string,MatchRoom>();
        this.playerRoomMap=new Map<string,string>();
    }

    public createRoom(player1Id:string,socket1Id:string,player2Id:string,socket2Id:string){
        let roomId=generateRoomId();
        while(this.rooms.has(roomId)){
            roomId=generateRoomId();
        }

        this.playerRoomMap.set(player1Id,roomId);
        this.playerRoomMap.set(player2Id,roomId);
        const room=new MatchRoom(roomId);
        this.rooms.set(roomId,room);
        room.join(player1Id,socket1Id);
        room.join(player2Id,socket2Id);
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
            players.player1&&this.playerRoomMap.delete(players.player1);
            players.player2&&this.playerRoomMap.delete(players.player2);
        }
    }
}

export const roomManager=new RoomManager();
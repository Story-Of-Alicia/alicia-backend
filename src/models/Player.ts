export enum Gender {
    Baby = 0,
    Boy = 1,
    Girl = 2
  }
  
  export enum AgeGroup {
    Kid = 0x0C,
    Teenager = 0x0D,
    Highschooler = 0x10,
    Adult = 0x13,
  }
  
  export interface Item {
    uid: number;
    tid: number;
    val: number;
    count: number;
  }
  
  export interface Player {
    lobbyTime: number;
    selfUid: number;
    nickName: string;
    profileGender: Gender;
    level: number;
    carrots: number;
    characterEquipment: Item[];
    horseEquipment: Item[];
    ageGroup: AgeGroup;
  }
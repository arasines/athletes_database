export interface IAthlete {
  athleteId: string;
  name: string;
  surname: string;
  fullname: string;
  dateOfBirth: string;
  bio: string;
  height: number;
  weight: number;
  globalScore: number;
  photo: IAthletePhoto;
  athleteResults?: [IAthleteResult];
}
export interface IAthleteResult {
  gold: number;
  bronze: number;
  silver: number;
  game: IGame;
}
export interface IAthletePhoto {
  mimeType: string;
  blob: string;
}
export interface IGame {
  gameId: string;
  city: string;
  year: string;
}

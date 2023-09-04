export interface IAthlete {
  athleteId: string;
  name: string;
  surname: string;
  fullName: string;
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
  photo: string;
  thumbnail: string;
}
export interface IGame {
  gameId: string;
  city: string;
  year: string;
}

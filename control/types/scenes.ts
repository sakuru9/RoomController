export interface HueScene {
  id: string;
  colorString: string;
  name: string;
  type: string;
  group: string;
  lights: string[];
  owner: string;
  recycle: boolean;
  locked: boolean;
  appdata: {
    version: number;
    data: string;
  };
  picture: string;
  lastupdated: string;
  version: number;
  lightstates: { [key: string]: SceneLightState };
}

export interface SceneLightState {
  on: boolean;
  bri: number;
  xy: number[];
}

export interface HueGroup {
  name: string;
  lights: string[];
  sensors: string[];
  type: HueGroupType;
  state: {
    all_on: boolean;
    any_on: boolean;
  };
  recycle: boolean;
  class: string;
  action: {
    on: boolean;
    alert: string;
  };
}

export enum HueGroupType {
  room = "Room",
  zone = "Zone",
}

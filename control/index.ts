import { numbersToRgbString, xyToRgb } from "./utils";
import { HueGroup, HueGroupType } from "./types/groups";
import { HueLight } from "./types/lights";
import { HueScene, SceneLightState } from "./types/scenes";
import { absurd, pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import { TaskEither } from "fp-ts/lib/TaskEither";

const HUE_BRIDGE_IP = "192.168.0.100";
const HUE_AUTHORIZED_USER = "";

type ZoneResponse = string | HueGroup[];
type SceneResponse = string | HueScene[] | HueScene;

const baseUrl = () => `http://${HUE_BRIDGE_IP}/api/${HUE_AUTHORIZED_USER}`;

export const testBridgeConnection = async (ipAddr: string): Promise<E.Either<false, true>> => {
  try {
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), 5000);

    const req = await fetch(`http://${ipAddr}/api/${HUE_AUTHORIZED_USER}`, {
      signal: timeoutController.signal,
    });
    if (req.status === 200) {
      clearTimeout(timeoutId);
      return E.right(true);
    } else return E.left(false);
  } catch (e) {
    return E.left(false);
  }
};

export const fetchHueApi = async <T>(
  resourceUrl: string,
  id?: string
): Promise<E.Either<Error, T>> => {
  try {
    const response = await fetch(`${baseUrl()}${resourceUrl}/${id ? id : ""}`);
    if (response.status !== 200) E.left("Error");

    return E.right(await response.json());
  } catch (e) {
    return E.left(e);
  }
};

const formatResponse = <T>(data: { [key: string]: T }): T[] => {
  return Object.keys(data).map((g) => {
    return { ...data[g], id: g };
  });
};

export const fetchGroups = async () => await fetchHueApi<{ [key: string]: HueGroup }>("/groups");

export const getGroups = async () => {
  return pipe(
    await fetchGroups(),
    E.map((d) => formatResponse(d))
  );
};

export const getZones = async (): Promise<ZoneResponse> => {
  return pipe(
    await getGroups(),
    E.map((g) => g.filter((grp) => grp.type === HueGroupType.zone)),
    E.fold(
      (e) => e.message,
      (a) => a as ZoneResponse
    )
  );
};

export const fetchLightStates = async () =>
  await fetchHueApi<{ [key: string]: HueLight[] }>("/lights");

export const getLightStates = async () => {
  return pipe(
    await fetchLightStates(),
    E.map((l) => formatResponse(l))
  );
};

const getColorStringFromLightStates = (sceneLightStates: SceneLightState[]): string => {
  return sceneLightStates
    .filter((sls) => sls.xy !== undefined)
    .map((st) => xyToRgb([st.xy[0], st.xy[1]], st.bri))
    .map((colorArr) => numbersToRgbString(colorArr))
    .filter((colors) => colors.length > 0)
    .join();
};

export const fetchScenes = async () => await fetchHueApi<{ [key: string]: HueScene }>("/scenes");
export const fetchSceneById = async (id: string) => await fetchHueApi<HueScene>("/scenes", id);

const getSceneAttributes = async (sceneId: string) => {
  return pipe(
    await fetchSceneById(sceneId),
    E.map((s) => ({
      ...s,
      formattedLightScenes: Object.keys(s.lightstates).map((ls) => s.lightstates[ls]),
    })),
    E.map((s) => ({ ...s, colorString: getColorStringFromLightStates(s.formattedLightScenes) })),
    E.fold(
      (e) => e.message,
      (scA) => scA as SceneResponse
    )
  );
};

export const getScenes = async (): Promise<HueScene[]> => {
  const grpScenes = pipe(
    await fetchScenes(),
    E.map((sceneList) => formatResponse(sceneList)),
    E.fold(
      (e) => e.message,
      (scenes) => scenes as SceneResponse
    ),
    (sceneResp) => sceneResp as HueScene[],
    (hScene) => hScene.filter((hs) => hs.type === "GroupScene")
  );

  return (await Promise.all(grpScenes.map((scene) => getSceneAttributes(scene.id)))) as HueScene[];
};

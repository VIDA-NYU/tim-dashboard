//export const API_URL = 'http://128.238.182.201:7890' //'http://192.168.50.222:7890' //'https://api.ptg.poly.edu';

const { protocol, hostname, port } = window.location;
export const API_URL = (
    `${protocol}//${port ? hostname : 'api.ptg.poly.edu'}${port ? ':7890' : ''}`
);

export const RECORDINGS_STATIC_PATH = '/recordings/static/';
export const TEST_USER = 'test';
export const TEST_PASS = 'test';
export const WS_API_URL = API_URL.replace('https://', 'wss://').replace('http://', 'ws://');
export const REASONING_CHECK_STREAM = 'reasoning:check_status';
export const REASONING_ENTITIES_STREAM = 'reasoning:entities';
export const DETIC_IMAGE_STREAM = 'detic:image';
export const EGOVLP_ACTION_STEPS_STREAM = 'egovlp:action:steps';
export const CLIP_ACTION_STEPS_STREAM = 'clip:action:steps';
export const DETIC_HANDS_STREAM = 'detic:hands';
export const MAIN_STREAM = 'main';

export const RECORDINGS_UPLOAD_PATh = "/recordings/upload/"

// export {API_URL, RECORDINGS_STATIC_PATH, TEST_USER, TEST_PASS};

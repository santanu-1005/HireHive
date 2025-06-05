const BASE_API_URL = import.meta.env.VITE_API_URL;

export const USER_API_ENDPOINT = `${BASE_API_URL}/user`;
export const JOB_API_ENDPOINT = `${BASE_API_URL}/job`;
export const APPLICATION_API_ENDPOINT = `${BASE_API_URL}/application`;
export const COMPANY_API_ENDPOINT = `${BASE_API_URL}/company`;

console.log(import.meta.env)

const NAVER_CLIENT_ID = process.env.REACT_APP_REST_API_KEY2;
const OAUTH_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL2;


export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&state=${Math.random().toString(36).substr(3, 14)}`
import Cookies from "js-cookie";
import { decodeToken } from '../api/jwtdecode';

const token = Cookies.get('token') || undefined;

let userInfo = undefined;

if (token) {
  try {
    userInfo = {
      username: '',
    };
    const decodedToken = decodeToken(token);
    userInfo.username = decodedToken.username || 'Guest';
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
} else {
  console.warn("No token found in cookies");
}

export default userInfo;

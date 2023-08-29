import jwtDecode from "jwt-decode";

const decodeJwt = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    console.log("decodedToken", decodedToken)
    return decodedToken;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export default decodeJwt;

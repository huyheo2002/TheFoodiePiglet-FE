import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { handleLoginGoogleRedux } from "../../redux/actions/userAction";
import { useAuth } from "../../contexts/authContext";
import * as commonServices from "../../services/commonServices";

function LoginSuccess() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataUser, setDataUser } = useAuth();
  const [valueLocal, setValueLocal] = useLocalStorage("dataUser", "");
  const dataUserRedux = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(handleLoginGoogleRedux(userId));
  }, []);

  useEffect(() => {
    if (dataUserRedux && dataUserRedux.auth === true) {
      setValueLocal(dataUserRedux);
      navigate("/");
    }
  }, [dataUserRedux]);

  const decodeToken = async (accessToken) => {
    try {
      const respon = await commonServices.handleDecoded(accessToken);
      if (respon?.errCode === 0) {

        return respon.decoded;
      }
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dataUserRedux && dataUserRedux.token && dataUserRedux.auth === true) {
        setValueLocal(dataUserRedux);
        const dataUserResponse = await decodeToken(dataUserRedux.token);

        if (dataUserResponse) {
          setDataUser(dataUserResponse)
          navigate("/");
        }
      }
    };

    fetchData();
  }, [dataUserRedux])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <h1 className="text-6xl font-semibold mt-8 text-[#ccc]">
        Vui lòng đợi trong ít phút
      </h1>
    </div>
  );
}

export default LoginSuccess;

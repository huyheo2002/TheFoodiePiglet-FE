import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { handleLoginGoogleRedux } from "../../redux/actions/userAction";

function LoginSuccess() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueLocal, setValueLocal] = useLocalStorage("dataUser", "");

//   let spliceId = Number.parseInt(userId.toString().slice(0, 9));

  const dataUserRedux = useSelector((state) => state.user.user);
  console.log("dataUserRedux login", dataUserRedux)
  useEffect(() => {
    dispatch(handleLoginGoogleRedux(userId));
  }, [])

  useEffect(() => {    
    if (dataUserRedux && dataUserRedux.auth === true) {
      setValueLocal(dataUserRedux);
      navigate("/");
    }
  }, [dataUserRedux]);



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

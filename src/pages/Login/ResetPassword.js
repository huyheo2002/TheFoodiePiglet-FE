import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import Modal from "../../components/Modal";
import * as authServices from "../../services/authServices";
import Button from "../../components/Button";
import { useEffect } from "react";
import { TBUTTON_VARIANT } from "../../types/button";
import { useAuth } from "../../contexts/authContext";
import * as commonServices from "../../services/commonServices";

function ResetPassword() {
  const { dataUser } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const decoded = async () => {
    if (params.token) {
      console.log("params.token", params.token);
      const respon = await commonServices.handleDecoded(params.token);
      console.log("respon.decoded", respon)
      if (respon && respon.errCode === 0) {
          console.log("okok");
          return respon.decoded.infoUser;
        } else {
          navigate("/not-found")
      }
    }
  }

  const checkAuth = async () => {
    if (params.token) {
      console.log("dataUser", dataUser);
      if (dataUser) {
        return dataUser.infoUser;
      } else {
        navigate("/not-found");
      }

      return null;
    } else {
      // navigate("/not-found");
    }
  };

  useEffect(() => {
    // checkAuth();
    decoded();
  }, []);

  const handleSubmit = async () => {
    await decoded().then(async (result) => {
      const data = new FormData();
      data.set("username", result.username);
      data.set("email", result.email);

      const respon = await authServices.handleResetPassword(data);
      if (respon && respon.errCode === 0) {
        navigate("/login");
      }
    });
  };

  return (
    <Modal open={true}>
      <Heading variant={"primary"}>Reset Password</Heading>
      <div className="mt-4 mx-auto">
        <p className="text-base font-medium text-gray-600 text-center">
          Yêu cầu đổi mật khẩu của bạn đã được xử lý thành công!
        </p>
        <p className="text-base font-medium text-gray-600 text-center">
          Vui lòng bấm <strong>Xác Nhận</strong> và vào email để nhận mật khẩu
          mới.
        </p>
      </div>

      <div className="flex justify-end">
        <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={handleSubmit}>
          Xác nhận
        </Button>
      </div>
    </Modal>
  );
}

export default ResetPassword;

import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import Modal from "../../components/Modal";
import * as commonServices from "../../services/commonServices";
import * as authServices from "../../services/authServices";
import Button from "../../components/Button";
import { useEffect } from "react";

function ResetPassword() {
    const params = useParams();
    const navigate = useNavigate();
    console.log("params", params);

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

            return null;
        } else {
            navigate("/not-found")
        }
    };

    useEffect(() => {
        decoded();
    }, [])

    const handleSubmit = async () => {
        await decoded().then(async result =>  {
            console.log("result", result);
            const data = new FormData();
            data.set("username", result.username);
            data.set("email", result.email);

            console.log("data entry:", Object.fromEntries(data.entries()));
            const respon = await authServices.handleResetPassword(data);

            if(respon && respon.errCode === 0) {
                navigate("/login");
            }
        })
    }

    return (
        <Modal open={true}>
            <Heading variant={"primary"}>Reset Password</Heading>
            <div className="mt-4 mx-auto">
                <p className="text-base font-medium text-gray-600 text-center">
                    Yêu cầu đổi mật khẩu của bạn đã được xử lý thành công!
                </p>
                <p className="text-base font-medium text-gray-600 text-center">
                    Vui lòng bấm <strong>Xác Nhận</strong> và vào email để nhận mật khẩu mới.
                </p>
            </div>

            <div className="flex justify-end">
                <Button variant={"primary"} onClick={handleSubmit}>
                    Xác nhận
                </Button>
            </div>
        </Modal>
    );
}

export default ResetPassword;
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { TBUTTON_VARIANT } from "../../types/button";

function Error() {
    const navigate = useNavigate();
    return (
        <div className="text-2xl font-semibold text-[#444] text-center h-[100vh] flex flex-col justify-center">
            <h1 className="font-semibold text-3xl">Error 404</h1>
            <hr className="border-none h-1 bg-[#999] my-12 mx-auto w-1/2"/>
            <p className="text-xl">Oops! The page you requested was not found.</p>
            <span className="mt-4">
                <Button variant={TBUTTON_VARIANT.PRIMARY} onClick={() => navigate(-1)}>Go back</Button>
            </span>
        </div>
    );
}

export default Error;
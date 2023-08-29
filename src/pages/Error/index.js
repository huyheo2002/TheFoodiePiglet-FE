// import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

function Error() {
    const navigate = useNavigate();
    return (
        <div className="text-2xl font-semibold bg-[#f2f2f2] text-[#444] text-center">
            <h1 className="font-semibold text-3xl">Error 404</h1>
            <hr className="border-none border-t-[5px solid #999] my-12 mx-auto w-1/2"/>
            <p className="text-xl">Oops! The page you requested was not found.</p>
            <Button primary onClick={() => navigate(-1)}>Go back</Button>
        </div>
    );
}

export default Error;
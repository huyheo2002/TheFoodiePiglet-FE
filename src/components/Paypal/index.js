import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useContext, useEffect } from "react";
import GlobalContext from "../../contexts/globalContext";
import * as paymentServices from "../../services/paymentServices";

const style = { "layout": "vertical" };

const ButtonWrapper = ({ currency, showSpinner, totalPrice, payload }) => {
    const { paymentOnlineSuccess, setPaymentOnlineSuccess, showCongrat, setShowCongrat } = useContext(GlobalContext);
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency
            }
        })
    }, [currency, showSpinner])

    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, totalPrice]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            { amount: { currency_code: currency, value: totalPrice } }
                        ]
                    }).then(orderId => {
                        return orderId
                    })
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(async (respon) => {
                        if (respon.status === "COMPLETED") {
                            // console.log("respon pay online", respon)
                            // console.log("payload paypal", payload);
                            const dataSend = { ...payload, paymentMethod: "Thanh toán online", paymentStatus: "Đã thanh toán" }
                            // console.log("dataSend paypal", dataSend);

                            const responPayment = await paymentServices.handleCreateNewOrder(dataSend);
                            if (responPayment && responPayment.errCode === 0) {
                                setPaymentOnlineSuccess(true);
                                setShowCongrat(true);
                                // console.log("paypal api success")
                            }
                        } else {
                            console.log("respon pay online err", respon)
                        }
                    })
                }}
            />
        </>
    );
}

function Paypal({ totalPrice, payload }) {

    return (
        <div className="w-full min-h-[200px]">
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} showSpinner={false} totalPrice={totalPrice} payload={payload} />
            </PayPalScriptProvider>
        </div>
    );
}

export default Paypal;

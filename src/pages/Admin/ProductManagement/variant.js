import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as variantServices from "../../../services/variantServices";

function Variant() {
    const params = useParams();
    const [dataVariantInProduct, setDataVariantInProduct] = useState([]);

    const fetchDataVariantInProduct = async () => {
        let respon = await variantServices.findVariantInProduct() ?? null;
        if (respon) {
            setDataVariantInProduct(respon.products)
            console.log("respon detail variant services", respon)
        }
    }
    
    useEffect(() => {
        fetchDataVariantInProduct();
    }, [])
    console.log("params", params);
    return (  
        <Fragment>
            <div className="pl-3 w-[calc(100%-1rem)]">
                <div className="bg-white px-3 py-4 rounded-lg">
                    <h1 className="text-2xl font-semibold capitalize">
                        Variant Product Management
                    </h1>
                    {/* {listProductsCompact.length > 0 && (
                        <DataTable
                            data={[]}
                            btnCreateTitle={"Create Variant"}                            
                        // handleModalRead={handleOpenModalRead}
                        // handleModalEdit={handleOpenModalUpdate}
                        // handleModalDelete={handleOpenModalDelete}
                        />
                    )} */}
                </div>
            </div>
        </Fragment>
    );
}

export default Variant;
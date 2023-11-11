import { useEffect, useState } from "react";
import Heading from "../../../components/Heading";
import NotificationCard from "../../../components/NotificationCard";
import * as notificationServices from "../../../services/notificationServices";
import Pagination from "../../../components/Pagination";

function NotifyDetail() {
    const [listNotify, setListNotify] = useState([]);

    const handleGetAllNotify = async () => {
        const respon = await notificationServices.handleGetAllNotification();
        if (respon && respon.errCode === 0) {
            setListNotify(respon.notify)
        }
    }

    useEffect(() => {
        handleGetAllNotify();
    }, [])

    // pages
    const [postPerPage, setPostPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    let indexOfLastPost = 0;
    let indexOfFirstPost = 0;
    let currentPost = [];

    indexOfLastPost = currentPage * postPerPage;
    indexOfFirstPost = indexOfLastPost - postPerPage;
    currentPost = listNotify.length > 0 && listNotify.slice(indexOfFirstPost, indexOfLastPost);
    // console.log("currentPost", currentPost);
    const onChangePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // console.log("listNotify", listNotify)
    return (
        <div className="bg-white px-3 mx-3 w-[calc(100%-1.5rem)] rounded-lg shadow-black-rb-0.35 py-3 mb-4">
            <Heading variant={"primary"} line>Chi tiết thông báo</Heading>
            <div className="my-3">
                {currentPost.length > 0 && currentPost.map((item, index) => {
                    return <NotificationCard data={item} key={index} page={"full"} />
                })}
                <Pagination
                    postsPerPage={postPerPage}
                    totalPosts={listNotify && listNotify.length}
                    paginate={onChangePage}
                />
            </div>
        </div>
    );
}

export default NotifyDetail;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import useAlertStore from "../store/alertStore";
import DOMPurify from 'dompurify'

export default function ReadBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const { setAlert } = useAlertStore();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await API.get(`/blogs/${id}`);
                setBlog(res.data.data);
            } catch (error) {
                setAlert("danger", error.response?.data?.message || "Failed to load the blog");
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        };

        fetchBlog();
    }, [id, setAlert]);
    return (
        <>
            <div className="container mt-4">
                <div className="page">
                    <h1>{blog.title}</h1>
                    {Array.isArray(blog?.tags) && blog.tags.length > 0 && (
                        <p>Tags: <i>{blog.tags.join(", ")}</i></p>
                    )}
                    <hr />
                    <div
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
                    >

                    </div>
                </div>
            </div>
        </>
    )
}
import { useEffect } from "react";
import useBlogStore from "../store/blogstore";
import DOMPurify from 'dompurify';

export default function Home() {
    const { blogs, fetchBlogs } = useBlogStore();

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return (<>
        <div className="container mt-4">
            <h2 className="mb-4">All Blogs</h2>
            <div className="row">
                {blogs.map((blog) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={blog._id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${blog.content.slice(0, 100)}...`) }}></p>
                                <a href={`/blogs/${blog._id}`} className="btn btn-primary">
                                    Read
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}
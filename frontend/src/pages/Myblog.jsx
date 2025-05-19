import { useEffect } from "react"
import useBlogStore from "../store/blogstore";
import './MyBlog.css'
import DOMPurify from 'dompurify'
import {useNavigate} from 'react-router-dom'

export default function Myblog() {
    const { deleteBlog, myBlogs, fetchMyBlogs } = useBlogStore();
    const navigate = useNavigate()

    useEffect(() => {
        fetchMyBlogs()
    }, [fetchMyBlogs]);

    const handleDelete = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            await deleteBlog(blogId)
        }
    }

    return (
        <>
            <div className="container">
                <h2>My Blogs</h2>
                <hr />
                <div className="row">
                    {
                        myBlogs.length === 0 ?
                            <div className="notFound"><p>Didn't find any blogs. <a href="/create">Create a new blog?</a></p></div> :
                            myBlogs.map(blog => (
                                <div className="col-lg-4 col-md-6 mb-4" key={blog._id}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{blog.title}</h5>
                                            <p>Status:&nbsp;
                                                {blog.status === "draft" ?
                                                    <span className="badge text-bg-secondary">{blog.status}</span> :
                                                    <span className="badge text-bg-primary">{blog.status}</span>
                                                }
                                            </p>
                                            {
                                                blog.content.length === 0 ?
                                                    <p className="card-text">No content by Author</p> :
                                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${blog.content.slice(0, 100)}...`) }}></p>
                                            }
                                            <div className="btngrp">
                                                <a href={`/blogs/${blog._id}`} className="btn btn-primary">
                                                    Read
                                                </a>
                                                <a href={`/updateDraft/${blog._id}`} className="btn btn-info">
                                                    Update
                                                </a>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(blog._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>

            </div>
        </>
    )
}
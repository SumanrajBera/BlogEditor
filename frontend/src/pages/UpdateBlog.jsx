import { useEffect, useState, useRef } from 'react';
import useAlertStore from "../store/alertStore";
import { useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import "./CreateBlog.css"
import useBlogStore from '../store/blogstore';
import { useNavigate } from 'react-router-dom';
import API from "../api/axios";


export default function UpdateBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState("")
    const [content, setContent] = useState('');
    const { setAlert } = useAlertStore();
    const navigate = useNavigate()
    const { updateDraft, updateAndPublish} = useBlogStore()
    const [lastSavedContent, setLastSavedContent] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const saveTimeout = useRef(null);



    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        onUpdate: ({ editor }) => {
            const newContent = editor.getHTML();
            setContent(newContent);
            setIsTyping(true);
        },
    });
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await API.get(`/blogs/${id}`);
                const blogData = res.data.data;
                setStatus(blogData.status)
                setTitle(blogData.title || '');
                setTags(blogData.tags || []);
                setContent(blogData.content || '');
            } catch (error) {
                setAlert("danger", error.response?.data?.message || "Failed to load the blog");
                setTimeout(() => navigate("/myBlog"), 100);
            }
        };

        fetchBlog();
    }, [id, setAlert]);

    // set editor content after it's ready and content is loaded
    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content);
        }
    }, [editor, content]);

    useEffect(() => {
        if (!isTyping || content === lastSavedContent) return;

        clearTimeout(saveTimeout.current);

        saveTimeout.current = setTimeout(async () => {
            setIsTyping(false); // User stopped typing
            let success;
            if(status === "draft") {
                success = await updateDraft({ _id: id, title, tags, content });
            }else{
                success = await updateAndPublish({ _id: id, title, tags, content });
            }
            
            if (success) {
                setLastSavedContent(content);
                navigate('/myBlog')
            }
        }, 30000); // Save after 30s of inactivity

        return () => clearTimeout(saveTimeout.current);
    }, [content, isTyping, title, tags, id]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleTagsChange = (e) => {
        let input = e.target.value;
        input = input.split(",")
        setTags(input)
    }

    const updateAsDraft = async () => {
        let res = await updateDraft({ _id: id, title, tags, content });
        if (res) {
            setTimeout(() => navigate("/myBlog"), 1000);
        }
    }

    const updatePublish = async() => {
        let res = await updateAndPublish({ _id: id, title, tags, content });
        if (res) {
            setTimeout(() => navigate("/myBlog"), 1000);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="container">
            <h2>Update Blog</h2>
            <hr />
            <form className='mb-4' onSubmit={handleSubmit}>
                <label htmlFor="title" className="form-label">Enter a title</label>
                <input type="text" className="form-control mb-2" name="title" id="title" value={title} onChange={handleTitleChange} placeholder="Title shouldn't be empty" required />
                <label htmlFor="tags" className="form-label">Enter tags</label>
                <input type="text" className="form-control mb-2" name="tags" id="tags" value={tags} onChange={handleTagsChange} placeholder="Tags should be (,) seperated. Eg. horror, novel" />
                <div className="toolbar">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        Bullet List
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        Numbered List
                    </button>
                </div>
                <EditorContent editor={editor} style={{ border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }} className='my-editor' />
                <div className='buttongrp'>
                    {
                        status === "draft" ?
                            <>
                                <button onClick={updatePublish} className='btn btn-primary'>Publish</button>
                                <button onClick={updateAsDraft} className='btn btn-secondary'><i className="fa-solid fa-floppy-disk"></i> Update draft</button>
                            </>
                            :
                            <button onClick={updatePublish} className='btn btn-primary'>Update and Publish</button>
                    }
                </div>
            </form>

        </div>
    )
}
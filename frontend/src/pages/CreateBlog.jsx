import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import "./CreateBlog.css"
import useBlogStore from '../store/blogstore';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [content, setContent] = useState('');
    const navigate = useNavigate()

    const {publishBlog, draftBlog} = useBlogStore()

    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Start writing your blog here...</p>',
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        }
    })

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleTagsChange = (e) => {
        let input = e.target.value;
        input = input.split(",")
        setTags(input)
    }

    const handlePublish = async () => {
        let res = await publishBlog({title, tags, content})
        if(res) {
            setTimeout(()=>{
                navigate('/myBlog')
            },1500)
        }
    }

    const handleDraft = async() => {
        let res = await draftBlog({title, tags, content})
        if(res) {
            setTimeout(()=>{
                navigate('/myBlog')
            },1500)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="container">
            <h2>Create Blog</h2>
            <hr />
            <form className='mb-4' onSubmit={handleSubmit}>
                <label htmlFor="title" className="form-label">Enter a title</label>
                <input type="text" className="form-control mb-2" name="title" id="title" onChange={handleTitleChange} placeholder="Title shouldn't be empty" required/>
                <label htmlFor="tags" className="form-label">Enter tags</label>
                <input type="text" className="form-control mb-2" name="tags" id="tags" onChange={handleTagsChange} placeholder="Tags should be (,) seperated. Eg. horror, novel" />
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
                    <button onClick={handlePublish} className='btn btn-primary'>Publish</button>
                    <button onClick={handleDraft} className='btn btn-secondary'><i className="fa-solid fa-floppy-disk"></i> Save draft</button>
                </div>
            </form>

        </div>
    )
}

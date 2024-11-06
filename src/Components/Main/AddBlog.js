// src/App.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import Layout from '../../Layout/Layout';

const AddBlog = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log('Content:', content);
        console.log('Image:', image);
    };

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    return (
        <Layout>
        <div className="container mt-5">
            <h2 style={{color:"black"}}>Add Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="content">Content</label> 
                    <ReactQuill 
                        value={content} 
                        onChange={setContent} 
                        modules={{
                            toolbar: [
                                [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                [{ 'align': [] }],
                                ['image', 'clean']
                            ],
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUpload">Upload Image</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="imageUpload" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                    />
                </div>
                {/* {image && <img src={image} alt="Uploaded" className="img-fluid mt-3" />} */}
                <button className="btn btn-primary rounded mt-3 me-2" onClick={togglePreview}>
                    {showPreview ? 'Hide Preview' : 'Preview'}
                </button>
                <button type="submit" className="btn btn-primary rounded mt-3">Submit</button>
            </form>

            
            {showPreview && ( 
                <div className="mt-5">
                    <h3>Preview</h3>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">Blog Title</h5>
                                    {/* <h2 style={{ color: "rgba(0, 0, 0, 0.60)", fontSize: "16px", fontWeight: "600" }}>
                                        {truncateText(content, 200)}
                                        <a href="#" className="btn btn-link">Read More</a>
                                    </h2> */}
                                    <div
                                        style={{ color: "rgba(0, 0, 0, 0.60)", fontSize: "16px", fontWeight: "600" }}
                                        dangerouslySetInnerHTML={{ __html: truncateText(content, 500) }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                {image && <img src={image} className="img-fluid rounded-start" alt="Preview" />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </Layout>
    );
};

export default AddBlog;

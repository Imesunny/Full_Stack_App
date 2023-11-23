import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Call your API endpoint to get all blogs
        const response = await api.get('/blog');
        console.log(response);
        const blogs = response.data.data ? response.data.data.Blogs : [];
        setBlogs(blogs);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.Title}</h3>
            <p>{blog.Content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;

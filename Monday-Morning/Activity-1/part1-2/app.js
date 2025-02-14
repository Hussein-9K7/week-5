const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

const blog = {
  title: 'New Blog',
  body: 'This is the content of the new blog.',
  userId: 1,
};


const addBlog = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to add blog: ${response.statusText}`);
    }

    const json = await response.json();
    console.log('New Blog added:', json);
  } catch (error) {
    console.error('Error adding blog:', error.message);
  }
};


const fetchBlogs = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('All Blogs:', data);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
  }
};

const fetchBlog = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog with ID ${id}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Single Blog:', data);
  } catch (error) {
    console.error('Error fetching blog:', error.message);
  }
};


const updateBlog = async (blogId, updatedData) => {
  try {
    const response = await fetch(`${apiUrl}/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update blog with ID ${blogId}: ${response.statusText}`);
    }

    const updatedBlog = await response.json();
    console.log('Blog updated:', updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error.message);
  }
};


const deleteBlog = async (blogId) => {
  try {
    const response = await fetch(`${apiUrl}/${blogId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete blog with ID ${blogId}: ${response.statusText}`);
    }

    console.log('Blog deleted successfully');
  } catch (error) {
    console.error('Error deleting blog:', error.message);
  }
};


addBlog();
fetchBlogs();
fetchBlog(1);
updateBlog(1, { title: 'Anyting', body: 'This is anything' });
deleteBlog(1);

const express = require('express');
const Blog = require('../server/model/dbschema'); 
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        
        const totalBlogs = await Blog.countDocuments();
        const blogs = await Blog.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        
        const totalPages = Math.ceil(totalBlogs / limit);
        const hasPrev = page > 1;
        const hasNext = page < totalPages;

        res.render('index', {
            blogs,
            currentRoute: '/',
            currentPage: page,
            totalPages: totalPages,
            hasPrev: hasPrev,
            hasNext: hasNext
        });
    } catch (error) {
        console.error('Database error', error);
        res.status(500).render('error', { message: 'Database error' });
    }
});

router.get('/login', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render('login');
    } catch (error) {
        console.error('Database error', error);
        res.status(500).render('error', { message: 'Database error' });
    }
});

router.get('/read/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).render('error', { 
                message: 'Blog not found',
                currentRoute: '/'
            }); 
        }
        
        res.render('read', {
            blog,
            currentRoute: `/read/${id}`
        });
        
    } catch (error) {
        console.error('Database error', error);
        res.status(500).render('error', { 
            message: 'Database error',
            currentRoute: '/'
        });
    }
});

router.get('/contact', (req, res) => {
    res.render('connect', { currentRoute: '/contact' });
});

router.get('/archives', async (req, res) => {
    try {
        const archives = await Blog.find().sort({ createdAt: -1 });
        res.render('archives', { archives, currentRoute: '/archives' });
    } catch (error) {
        console.error('Database error', error);
        res.status(500).render('error', { message: 'Database error' });
    }
});

router.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.q || '';
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        // Build the query to search in title or content (case-insensitive)
        const query = searchQuery
            ? {
                  $or: [
                      { title: { $regex: searchQuery, $options: 'i' } },
                      { content: { $regex: searchQuery, $options: 'i' } }
                  ]
              }
            : {};

        const totalBlogs = await Blog.countDocuments(query);
        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const totalPages = Math.ceil(totalBlogs / limit);
        const hasPrev = page > 1;
        const hasNext = page < totalPages;

        res.render('search', {
            blogs,
            currentRoute: '/search',
            currentPage: page,
            totalPages: totalPages,
            hasPrev: hasPrev,
            hasNext: hasNext,
            searchQuery // Pass searchQuery to display in the template
        });
    } catch (error) {
        console.error('Search error', error);
        res.status(500).render('error', { message: 'Search error' });
    }
});

// Handle POST /search for form submission
router.post('/search', async (req, res) => {
    try {
        const searchQuery = req.body.search || '';
        // Redirect to GET /search with the query parameter to handle pagination
        res.redirect(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
        console.error('Search error', error);
        res.status(500).render('error', { message: 'Search error' });
    }
});

module.exports = router;
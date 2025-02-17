const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.render('index', { video: null, error: null });
});

// Route to handle video download request
app.post('/download', async (req, res) => {
  const videoUrl = req.body.videoUrl;
  const apiUrl = `https://api.davidcyriltech.my.id/facebook2?url=${videoUrl}`;

  try {
    const response = await axios.get(apiUrl);
    const videoData = response.data;

    if (videoData.status) {
      res.render('index', { video: videoData.video, error: null });
    } else {
      res.render('index', { video: null, error: 'Video not found or invalid link.' });
    }
  } catch (error) {
    res.render('index', { video: null, error: 'An error occurred. Please try again.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

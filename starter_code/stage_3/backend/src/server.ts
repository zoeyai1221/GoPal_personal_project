import app from './app';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get port from environment or use default
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/api`);
});

import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
const port = 3030;

app.use(express.json()); // Enable JSON parsing middleware
app.use(cookieParser());
app.use(cors())

// Secret key for JWT (replace with a strong secret in production)
const secretKey = 'your-secret-key';

// Sample user data (replace with your user data model)
const users = [];

// Middleware to extract and verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
};

// Sample route with authentication and authorization
app.get('/api/data', authenticateToken, (req, res) => {
    // Authorization check based on user role
    if (req.user.role !== 'admin') {
        return res.status(403).send('Forbidden: Insufficient privileges');
    }

    // Only authorized and authenticated users can access this route
    res.json({ data: 'This is sensitive data for admins only.' });
});

// Sign-in route with session cookie
app.post('/api/signin', (req, res) => {
    const { username, password } = req.body;

    // Find user by username and password (replace with your authentication logic)
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT for sign-in
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, {
        expiresIn: '15m',
    });

    // Set a session cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ token });
});

// Sign-up route with session cookie
app.post('/api/signup', (req, res) => {
    const { username, password, role } = req.body;

    // Check if the username is already taken
    if (users.some(u => u.username === username)) {
        return res.status(400).json({ error: 'Username is already taken' });
    }

    // Add user to the array (replace with database insertion in production)
    const newUser = { id: users.length + 1, username, password, role };
    users.push(newUser);

    // Generate JWT for sign-up
    const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, secretKey, {
        expiresIn: '15m',
    });

    // Set a session cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.json({ token });
});

app.get("/data", (req, res) => {
    try {
        res.status(200).json({ "message": "Hello from server !!!!"})
    } catch (err) {
        res.status(400).json(err)
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

// Sample JWT token
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJlYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg';

// Use default middlewares (CORS, static, etc)
server.use(middlewares);

// Make sure JSON bodies are parsed correctly
server.use(bodyParser.json());

// Handle sign-in requests
server.post('/sign-in', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(username === 'nygmarose' && password === 'password') {
        res.json({
            // User settings data
            settings: [],
            // Signin Email (Private for users)
            email: 'mua@nygmarosebeauty.com',
            // JWT for authenticating requests
            token: jwtToken,
            // Public profile data for user
            profile: {
                "id": 1,
                "username": "nygmarose",
                "profilePic": "https://instagram.fsin1-1.fna.fbcdn.net/vp/771f0952ce7f6a46edf3ca45a22a22be/5DC180C6/t51.2885-19/s320x320/62494222_322600142006525_291767870130487296_n.jpg?_nc_ht=instagram.fsin1-1.fna.fbcdn.net",
                "bio": "New testing account!",
                "postCount": 3,
                "followingCount": 2,
                "followerCount": 2,
                "contactInfo": {
                    "email": "mailto:mua@nygmarosebeauty.com",
                    "website": "https://nygmarosebeauty.com"
                },
                "followers": [
                    1,
                    2,
                    3
                ],
                "following": [
                    1,
                    2,
                    3
                ],
                "posts": [
                    1,
                    2,
                    3
                ]
            }
        });
    }
    res.send(422, 'Invalid username or password');
});

// Protect other routes
server.use((req, res, next) => {
    if (isAuthorized(req)) {
        console.log('Access granted');
        next();
    } else {
        console.log('Access denied, invalid token');
        res.sendStatus(401);
    }
});

// API routes
server.use(router);

// Start server
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Check whether request is allowed
function isAuthorized(req) {
    let bearer = req.get('Authorization');
    if (bearer === `Bearer ${jwtToken}`) {
        return true;
    }
    return false;
}

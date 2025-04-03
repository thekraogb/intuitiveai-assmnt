
## Ricky and Morty App

A full-stack application for managing and generating character backstories. Built with Next.js, Express.js, and MongoDB.

> The app currently doesnt have all required features. i didnt have much time to work on it, especially that i don't have experince nor am i familiar with some of the technologies. it's not the most impressive in terms of features but i think it is decent enough to assess. i will share my thoughts on missing features and how i would implement them,as well as what parts of the app might need improvments.

### 🚀 Features
1. Default Characters List
Displays a paginated list of characters.

Fetches data from an external API.

2. Custom Character Management (CRUD)

3. Character Backstory Generator (OpenAI API)
Generates unique backstories based on species, origin, and traits.

### 🛠 Tech Stack
Frontend: Next.js, Zustand, TailwindCSS, shadcn/ui.

Backend: Express.js, MongoDB.

### 📦 Installation & Setup
1. Clone the repository
```
git clone https://github.com/thekraogb/intuitiveai-assmnt.git
cd repo
```

3. Install dependencies

```
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables
Create a .env file in backend/ directory with these credentials:
   - ```PORT```
   - ```OPENAI_API_KEY``` 
   - ```MONGO_URI``` 
   - ```JWT_SECRET```
   - ```REFRESH_TOKEN```

4. Run the app

#### Start backend server
```cd backend
npm start
```

#### Start frontend server
```cd frontend
npm run dev
```
### 📌 API Endpoints

#### Authentication API

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| POST   | /api/auth/signup      |                 |
| POST   | /api/auth/login       |                         |
| POST   | /api/auth/refresh     | Refresh JWT tokens                 |

#### Custom Character API

| Method | Endpoint                     | Description                   |
|--------|------------------------------|-------------------------------|
| POST   | /api/custom-character         | Create a new custom character |
| GET    | /api/custom-character         | Get all custom characters     |
| GET    | /api/custom-character/:id     | Get a specific character      |
| PUT    | /api/custom-character/:id     | Update a character            |
| DELETE | /api/custom-character/:id     | Delete a character            |

#### Backstory Generator API

| Method | Endpoint        | Description                     |
|--------|-----------------|---------------------------------|
| POST   | /api/story/      | Generate a character backstory  |


### 📝 Potential Optimizations

- **React Context**: Switch from Zustand to React Context for state management, particularly for the auth part, as Zustand is currently only used for this and is overkill (I initially chose it planning to implement all features).

- **Caching**: Implement caching to store frequently accessed character info and backstories from external APIs.

- **RAG Implementation**: Instead of fine-tuning models for the chatting feature, explore using Retrieval-Augmented Generation to provide more relevant responses.

- **Cost-Efficient AI APIs**: Consider using Gemini or other alternative AI APIs to reduce costs, as OpenAI’s API can become expensive.

- **Lazy Loading for Images**.

- **Web workers & Web servers**.


Code Snippet Management System

A web application for storing, categorizing, and retrieving code snippets with features like search, filtering, syntax highlighting, and favorites functionality.

Features

📝 Add & Edit Snippets – Store and modify your code snippets easily.

🔍 Search & Filter – Search by title, language, and favorites.

🌟 Favorite Snippets – Mark snippets as favorites for quick access.

📌 User Authentication – Secure user authentication using JWT.

🎨 Syntax Highlighting – Display code snippets with proper formatting.

Tech Stack

🖥️ Backend (Laravel)

Laravel 10 (PHP Framework)

MySQL (Database)

JWT Authentication

RESTful API

🌍 Frontend (React)
React.js

Axios (API calls)

React Router

Installation
1️⃣ Clone the Repository

git clone https://github.com/Hussein-02/code-snippet.git

cd code-snippet

2️⃣ Backend Setup (Laravel)

cd Server

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate --seed

php artisan serve

Set up your .env file with database credentials.

Run php artisan migrate --seed to populate sample data.

3️⃣ Frontend Setup (React)
cd Client

npm install

npm run dev

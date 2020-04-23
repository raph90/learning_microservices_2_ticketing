# Auth Service

- All of our route handlers get their own files in /routes

We need an error handling middleware for consistency.
We're going to subclass the Error object to communicate as much information to the user as possible.

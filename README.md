# Live Link: https://book-catalog-backend-delta-dusky.vercel.app/api/v1/books/

## Application Routes:

### auth

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)

### User

- api/v1/users (GET)
- api/v1/users/:id (Single GET)
- api/v1/users/:id (PATCH) update a user
- api/v1/users/:id (DELETE) delete a user
- api/v1/profile (GET) get a user profile information.

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/:id (Single GET)
- api/v1/categories/:id (PATCH) update a category.
- api/v1/categories/:id (DELETE) delete a category.

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET) (added filtering and pagination as provided in assignment documentation)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId (GET)

#### admin gmail and password

- gmail: amin@gmail.com
- password: 123456

#### users gmail and password

- gmail: ruhul@gmail.com
- password : 123456

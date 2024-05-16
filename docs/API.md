# API routes

## Session

### Create

Creates a new session. (sign in)

#### Possible errors

- `UNAUTHORIZED` if the credentials are invalid

## Category

### Create

Creates a new category.

#### Possible errors

- `CONFLICT` if the category already exists.

### Get

Gets a category with its products based on its slug and the requested page.

#### Possible errors

- `NOT_FOUND` if the requested category does not exist.

## Product

### Get single

Gets a single product based on its slug.

### Possible errors

- `NOT_FOUND` if the requested product does not exist.

## Cart

### Add

Adds a product to the cart.

#### Possible errors

- `NOT_FOUND` if the requested product does not exist.
- `UNAUTHORIZED` if the user is not signed in.

### Get

Gets the cart.

#### Possible errors

- `UNAUTHORIZED` if the user is not signed in.

### Save Local

Saves the local cart to the database.

#### Possible errors

- `UNAUTHORIZED` if the user is not signed in.

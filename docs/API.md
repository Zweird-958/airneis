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

Gets a category with its products.

#### Possible errors

- `NOT_FOUND` if the category does not exist.

## Cart

### Add to cart

Add a product to the cart.

### Get

Gets the cart.

### Save Local

Save local cart to database.

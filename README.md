# User Management CRUD

- Create a CRUD for user management.
  - Create the required routes.
  - It must include:
    - A user list page.
    - A create/update user page.
    - A delete option (can be implemented as a button).

## API Endpoints

### Create User (POST)

```javascript
fetch('https://dummyjson.com/users/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Muhammad',
    lastName: 'Ovi',
    age: 250,
    /* other user data */
  })
})
```

### Update User (PUT/PATCH)

```javascript
fetch('https://dummyjson.com/users/2', {
  method: 'PUT', // or PATCH
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lastName: 'Owais'
  })
})
```

### Delete User

```javascript
fetch('https://dummyjson.com/users/1', {
  method: 'DELETE',
})
```

### Get All Users

```javascript
fetch('https://dummyjson.com/users')
```

### Get User by ID

```javascript
fetch('https://dummyjson.com/users/1')
```

## Additional Requirements

- Create a Guard to prevent users with an ID greater than 10 from accessing the update screen.
- Create an HTTP Interceptor that adds the header:

```text
X-ERP-APP: testing
```

- The application must indicate whenever data is being loaded.
- The solution must be implemented using NgRx & Effects.
- Add a dropdown to assign the corresponding role to a user.

# Generic Confirmation Dialog

- Create a generic confirmation dialog for deleting entities.
- Apply it to both Users and Roles.

# Date Format Service Replacement

- Replace the injected DateFormat service in app.component.ts without modifying the component implementation directly.
- Example: use DateFormatService instead of UsDateFormatService.

# Global Application State

- Create a global state to indicate whether the application has already loaded the user data from:

```text
https://dummyjson.com/users/1
```

- If the user data has not yet been loaded, display a loading indicator and prevent the page content from rendering until the load is complete.

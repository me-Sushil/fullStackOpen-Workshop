# JWT Flow in Full Stack Open (Part 4 & 5)

```mermaid
sequenceDiagram
    participant U as User (Browser / React App)
    participant FE as Frontend (React)
    participant BE as Backend (Express + MongoDB)

    U->>FE: Enter username + password
    FE->>BE: POST /api/login {username, password}
    BE->>BE: Verify password with bcrypt
    BE-->>FE: Return JWT (if valid)

    Note right of FE: Store JWT in memory / state<br>(not in localStorage<br>or cookies for security)

    U->>FE: Create a new note
    FE->>BE: POST /api/notes {content, important}<br>+ Authorization: Bearer <token>
    BE->>BE: Verify JWT (jwt.verify)
    BE->>BE: Find user from decodedToken.id
    BE->>BE: Save note with user reference
    BE-->>FE: Return saved note JSON
    FE-->>U: Update UI with new note
```
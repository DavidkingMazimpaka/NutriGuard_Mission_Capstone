-- Create users table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Create index on username and email
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_users_username')
    CREATE INDEX idx_users_username ON users(username);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_users_email')
    CREATE INDEX idx_users_email ON users(email);

-- Create trigger to update updated_at column
GO
CREATE TRIGGER update_users_timestamp
ON users
AFTER UPDATE
AS
BEGIN
    UPDATE u
    SET updated_at = GETDATE()
    FROM users u
    INNER JOIN INSERTED i ON u.id = i.id;
END;
GO
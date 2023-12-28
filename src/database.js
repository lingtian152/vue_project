import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json()) // Use body-parser middleware

// MySQL connection configuration
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'data_test'
})

// Wrapper for async MySQL queries using promises
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

// Establish database connection
async function establishConnection() {
  try {
    await connection.promise().execute('SELECT 1') // Check if the connection is alive
    console.log('Connection established successfully')
  } catch (err) {
    console.error('Retrying after 2 seconds')
    setTimeout(establishConnection, 2000)
  }
}

// API endpoint for login
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  res.header('Access-Control-Allow-Origin', '*')

  try {
    const results = await queryAsync('SELECT * FROM users WHERE username = ?', [username])

    if (results.length === 0) {
      res.status(401).json({ error: '用户名或密码错误' })
    } else {
      const hashedPassword = results[0]?.password

      if (!hashedPassword) {
        res.status(500).json({ error: '无法检索用户密码' })
        return
      }

      const passwordMatch = await bcrypt.compare(password, hashedPassword)

      if (passwordMatch) {
        res.status(200).json({ message: '登录成功' })
      } else {
        res.status(401).json({ error: '账号或密码错误' })
      }
    }
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: '内部服务器错误' })
  }
})

// API endpoint for registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    // Ensure that password is a string before proceeding
    if (typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid password format' })
    }

    // Hash the password using bcrypt before storing it in the database
    const saltRounds = 10 // Adjust the number of rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Perform MySQL query to insert the user into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)'
    await queryAsync(query, [username, hashedPassword])

    res.status(201).json({ message: '注册成功' })
  } catch (error) {
    console.error('Error during registration:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  establishConnection()
})

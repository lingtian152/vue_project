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

// Connect to MySQL database
function connect() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL database:', err)
        reject(err)
      } else {
        console.log('Connected to MySQL database')
        resolve(connection)
      }
    })
  })
}

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
    await connect()
    console.log('Connection established successfully')
  } catch (err) {
    console.error('Retrying after 2 seconds')
    setTimeout(establishConnection, 2000)
  }
}

// API endpoint for login
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  res.header('Access-Control-Allow-Origin', '*') // Setting response header

  try {
    // Perform MySQL query to check if the user exists
    const results = await queryAsync('SELECT * FROM users WHERE username = ?', [username])

    if (results.length === 0) {
      res.status(401).json({ error: '用户名或密码错误' })
    } else {
      const hashedPassword = results[0].password

      // Compare the hashed password with the provided password
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

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  establishConnection()
})

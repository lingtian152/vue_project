import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'data_test'
})

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

async function establishConnection() {
  try {
    await connection.promise().execute('SELECT 1')
    console.log('Connection established successfully')
  } catch (err) {
    console.error('Retrying after 2 seconds')
    setTimeout(establishConnection, 2000)
  }
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  res.header('Access-Control-Allow-Origin', '*')

  try {
    const results = await queryAsync('SELECT * FROM users WHERE username = ?', [username])

    if (results.length === 0) {
      res.status(200).json({ message: '用户名或密码错误' }) // 返回错误
    } else {
      const hashedPassword = results[0]?.password

      if (!hashedPassword) {
        res.status(500).json({ message: '无法检索用户密码' })
      }

      const passwordMatch = await bcrypt.compare(password, hashedPassword)

      if (passwordMatch) {
        res.status(200).json({ message: '登录成功' })
      } else {
        res.status(200).json({ message: '账号或密码错误' })
      }
    }
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: '内部服务器错误' })
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  res.header('Access-Control-Allow-Origin', '*')
  try {
    if (password === '' || username === '') {
      res.status(201).json({ message: '请输入账号密码' }) // 返回错误
    } else {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds) // 生成哈希密码

      const query = 'INSERT INTO users (username, password) VALUES (?, ?)' // 插入数据
      await queryAsync(query, [username, hashedPassword]) // 执行插入

      res.status(201).json({ message: '注册成功' }) // 返回成功
    }
  } catch (error) {
    console.error('Error during registration:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  // 监听端口
  console.log(`Server running on port ${PORT}`)
  establishConnection()
})

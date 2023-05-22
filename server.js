const express = require('express')
const User = require('./User')
const sequelize = require('./database')

const app = express()
const port = 8086

app.use(express.json())

app.post('/users', async (req, res) => {
  const { name, email } = req.body

  try {
    const user = await User.create({ name, email })
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar o usuário' })
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao obter os usuários' })
  }
})

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' })
    } else {
      res.json(user)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao obter o usuário' })
  }
})

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id
  const { name, email } = req.body

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' })
    } else {
      user.name = name
      user.email = email
      await user.save()
      res.json(user)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizar o usuário' })
  }
})

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' })
    } else {
      await user.destroy()
      res.json({ message: 'Usuário excluído com sucesso' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao excluir o usuário' })
  }
})

sequelize
  .sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados')

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`)
    })
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o modelo com o banco de dados:', error)
  })

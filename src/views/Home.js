import Ame from "ame-super-app-client";

export default class Home {
  state = {
    todoList: []
  };

  async componentDidMount() {
    console.log('teste')
    const user = await Ame.askUserData()
    console.log('ameToken', user.ameToken)
    this.read()
  }

  findUser = async () => {
    const phone = this.state.phone.replace(/\D/g, '')
    console.log('procurando usuario no backend', phone)
    const userFound = await Ame.server.exec('TodoList.findUser', { phone })
    console.log('userFound', userFound)
    this.setState({ userFound })
  }

  findUserFront = async () => {
    try {
      const user = await Ame.askUserData()
      const phone = this.state.phone.replace(/\D/g, '')
      console.log('procurando usuario', phone)
      let userFound = await Ame.http.get(`https://api.hml.amedigital.com/api/customer/search?phone=${phone}`, {
        headers: {
          Authorization: `Bearer ${user.ameToken}`
        }
      })
      this.setState({ userFound: userFound.data })
    } catch (e) {
      console.log(e.message)
      this.setState({ userFound: { name: 'Não encontrado' } })
    }
  }

  transfer = async () => {
    await Ame.server.exec('TodoList.transfer', {
      amountInCents: 10,
      phone: this.state.phone,
      customerId: this.state.userFound.id
    })
  }

  read = async () => {
    const todoList = await Ame.server.exec('TodoList.read')
    this.setState({ todoList })
  }

  delete = async () => {
    await Ame.server.exec('TodoList.delete')
    this.setState({ todoList: [] })
  }

  onChangeHandler = async (todo, value) => {
    console.log(todo, value)
    await Ame.server.exec('TodoList.update', { status: value, _id: todo._id })
  }

  setPhone = (phone) => {
    this.setState({ phone })
  }

  setDescription = (description) => {
    // console.log('desc', description)
    this.setState({ description })
  }

  create = async () => {
    try {
      let body = {
        phone: this.state.phone,
        description: this.state.description
      }
      console.log('criando...', body)
      await Ame.server.exec('TodoList.create', body)
      this.read()
    } catch (e) {
      console.log(e)
    }
  }

  navigateTo = (item) => {
    Ame.navigation.navigate(item.to);
  };
}

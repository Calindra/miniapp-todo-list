import Ame from "ame-super-app-client";

export default class Home {
  state = {
    todoList: []
  };

  async componentDidMount() {
    this.read()
  }

  create = async () => {
    try {
      let body = {
        description: this.state.description
      }
      console.log('criando...', body)
      await Ame.server.exec('TodoList.create', body)
      this.read()
    } catch (e) {
      console.log('Create error', e.message)
    }
  }

  read = async () => {
    try {
      const todoList = await Ame.server.exec('TodoList.read')
      this.setState({ todoList })
    } catch(e) {
      console.log('Read error', e.message)
    }
  }

  update = async (todo, value) => {
    try {
      console.log('atualizando', todo, value)
      await Ame.server.exec('TodoList.update', { status: value, _id: todo._id })
    } catch(e) {
      console.log('Update error', e.message)
    }
  }

  delete = async () => {
    try {
      await Ame.server.exec('TodoList.delete')
      this.setState({ todoList: [] })
    } catch(e) {
      console.log('Delete error', e.message)
    }
  }

  setDescription = (description) => {
    // console.log('desc', description)
    this.setState({ description })
  }

}

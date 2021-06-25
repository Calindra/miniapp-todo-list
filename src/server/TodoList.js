export default class TodoList {

    async create(req) {
        let item = {
            time: Date.now(),
            ownerId: req.user.customerId,
            description: req.body.description,
            status: false
        }
        await db.todoList.insertOne(item)
    }

    async read(req) {
        const res = await db.todoList.find({ ownerId: req.user.customerId })
        console.log('Todos', res.length)
        return res
    }

    async update(req) {
        const todoItem = await db.todoList.findOne({ _id: req.body._id })
        if (!todoItem) {
            throw new Error('Item nao encontrado')
        }
        if (todoItem.ownerId !== req.user.customerId) {
            throw new Error('Vc nao pode alterar esse item')
        }
        const res = await db.todoList.updateOne({
            _id: req.body._id
        }, {
            $set: {
                status: req.body.status
            }
        })
    }

    async delete(req) {
        console.log('Apagando a lista')
        await db.todoList.deleteMany({ ownerId: req.user.customerId })
    }

}
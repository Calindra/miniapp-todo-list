const axios = require('axios')

const AME_HOST = process.env.AME_HOST || "https://api.hml.amedigital.com";

export default class TodoList {

    async create(req) {
        let item = {
            time: Date.now(),
            ownerId: req.user.customerId,
            assigneePhone: req.body.phone,
            description: req.body.description,
            status: false
        }
        await db.todoList.insertOne(item)
    }

    async read(req) {
        const res = await db.todoList.find({
            $or: [
                { ownerId: req.user.customerId },
                { assigneePhone: req.user.phone }
            ]
        })
        console.log(res)
        return res
    }

    async update(req) {
        const res = await db.todoList.update({
            $and: [
                {
                    $or: [
                        { ownerId: req.user.customerId },
                        { assigneePhone: req.body.phone },
                    ]
                },
                // { _id: req.body._id }
                { time: req.body.time }
            ]
        }, {
            $set: {
                status: req.body.status
            }
        })
        console.log('updated', res)
    }

    async delete(req) {
        await db.todoList.deleteMany({})
    }

    async findUser(req) {
        console.log('findUser...')
        let options = {
            headers: {
                Authorization: `Bearer ${req.user.ameToken}`,
                "Content-Type": "application/json",
            }
        };
        const phone = req.body.phone.replace(/\D/g, '')
        let response = await axios.get(
            `${AME_HOST}/api/customer/search?phone=${phone}`,
            options
        );
        console.log('user', response.data)
        return response.data;
    }

    async transfer(req) {
        console.log(req.body)
        let amountInCents = req.body.amountInCents || 10

        let destination = await this.findUser(req)
        console.log(`found destination ${JSON.stringify(destination)}`)
        if (!destination) {
            destination = { id: req.body.customerId }
        }
        let transactionPayload = {
            amount: amountInCents,
            currency: "BRL",
            description: `Bem-vindo!`,
            splits: [
                {
                    amount: amountInCents,
                    cashType: "CASH",
                    grossAmountInCents: amountInCents
                }
            ],
            title: "Transferência"
        };
        let options = {
            headers: {
                Authorization: `Bearer ${req.user.ameToken}`,
                "Content-Type": "application/json",
            }
        };
        let transactionResponse = await axios.post(
            `${AME_HOST}/api/wallet/user/transfers?ownerId=${destination.id}`,
            transactionPayload,
            options
        );
        return transactionResponse.data;
    }

}
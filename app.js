import express from "express";
const app = express();
app.use(express.json());

let clientes = [
    {
        id: 1,
        nome: "Karina"
    },
    {
        id: 2,
        nome: "Carol"
    }
];

function acharCliente(id){
    return clientes.findIndex(cliente => {
        return cliente.id === Number(id)
    });
};

app.get('/', (req, res) => {
    res.status(200).send("Seja Bem-vindo à API Karina & Carol");
});

app.get('/listar', (req, res) => {
    res.status(200).json(clientes)
});

app.get('/listar/:id', (req, res) => {
    const index = acharCliente(req.params.id);
    res.status(200).json(clientes[index]);
});

app.post('/cadastrar', (req, res) => {
    clientes.push(req.body);
    res.status(201).send("Cliente cadastrado com sucesso!")
})
app.put('/editar/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const {nome} = req.body;
    const cliente = clientes.find(cliente => cliente.id === id);

    if(!cliente){
        res.status(400).send("Cliente não encontrado.")
    }else{
        cliente.nome = nome;
        res.status(200).send("Dados atualizados com sucesso!")
    }
});
app.delete('/deletar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    clientes = clientes.filter(cliente => cliente.id !== id);
    res.status(200).send("Cliente deletado com sucesso!")
});
export default app;

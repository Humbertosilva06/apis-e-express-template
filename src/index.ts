import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { COURSE_STACK, TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


// pratica guiada
//cenario: estamos desenvolvendo um sistema de cursos online  e por enquanto temos a entida coruse (no databse tem o array de TCoruse). agora vamos criar um endpoit que buscara por todos os cursos cadastrados na databse.ts
// crie o primeiro endpoint : metodo get; path /courses; params nenhum; body nenhum; output 200 courses da databse.ts
// é compost de basicamente 4 partes: 1- o app.metodo(get, post, put e etc); 2- entres parentes, a string com o path ("/courses"); 3- o req e res (tipados com o Request e Response respectivamente) e por ultima a logica (colocar o res.status antes)

app.get ("/courses", (req:Request, res:Response)=>{
    res.status(200).send(courses)

})

//crie o segundo endpoint: este faz uma consulta por todos os cursos cadastrados e os filtra baseado em uma query params. A qquery se chamara q e será utilizada para gerar um resultad case insensitive. metodo get; path /courses/search; params query params (q); body nenhum; output 200 resultado do filtro por nome.

//fazemos uma const q que sera nossa query que gaurdara a requisição, ou seja, q = req.query.q e dizemos que ela é uma sring (as string)
// e fazemos uma verificação: se a q existir (q?) retorne o array courses filtrada verificando os itens que o nome inclui a query, se não existir retorne todo o array courses
//OBS: para adicionar uma query no postma ficaria http://localhost:3003/courses/search?q=nome do curso desejado (a queri é o ?+(nome que definimos pra query, nesse caso q )+=)


app.get ("/courses/search", (req:Request, res:Response)=>{
        const q = req.query.q as string

        const result = q?
        courses.filter(course => course.name.toLowerCase().includes(q.toLowerCase()))
        :
        courses

        res.status(200).send(result)
})

// ciando o terceiro endpoint: este será um endpoint de criação de recurso. no nosso cenario, faremos a criação de um nome curso . todas as informações do curso serão enviadas pelo cliente (quem faz a requisição) via body no formato JSON. Metdo Post; path /courses params nenhum body id, name, lessons, stack; output 201 "curso registrado com sucesso"
// primeiro o app.metodo< path, a callback com req e res, e a logica
// na logica iremos recer um body do cliente com as informações do curso, então quebramos o body em diferentes consts, tipamos e cada uma vai receber seu equivalente (req.body.id, req.body.name  e etc)
// depois fazemos uma const que gaurdara essas informações e tpimaos ela com o type do curso e passamos as conts que criamos separadamente.
//pegamos o array e fazemos o push do curso novo.
//OBS: poderiamos fazer a atribuição direto no newcourse: const newCourse:TCourse = {
    //id: req.body.id
    //name: req.body.name
    //lessonss: req.body.lessos
    //stack: req.body.stack
//}    



app.post ("/courses", (req:Request, res:Response) =>{
    const id: string = req.body.id
    const name:string = req.body.name
    const lessons:number = req.body.lessons
    const stack: COURSE_STACK = req.body.stack

    const newCourse:TCourse = {id, name, lessons, stack}

    courses.push(newCourse)
    console.log("cursos",  courses)
    res.status(201).send ("Curso criado com sucesso")

})

//fixação: 
//1- agora criaremos uma nova entidade chamada students (id:string, name:string, age:number) cire a tipagem e o array ,ock copm pelo menos dois estudantes
//2- escolha um dos endpoints  e imlemente no index.ts: get all students (referencie a pratica 1); get studen by name (referencia a pratica 2 ) e create student (referencia a pratica 3).

//2.1 - getAllStudnets:

app.get ("/students", (req:Request, res:Response)=>{
    res.status(200).send(students)
})

//2.2 getStudentsByname:

app.get ("/students/search", (req:Request, res:Response)=>{

    const q = req.query.q as string

    const result = q?
    students.filter(student=> student.name.toLowerCase().includes(q.toLowerCase()))
    :
    students
    
    res.status(200).send(result)
})

//2.3 createStudent:

app.post ("/students", (req:Request, res: Response)=>{

    const newStudent: TStudent = {

        id: req.body.id,
        name: req.body.name,
        age: req.body.age

    }

    students.push(newStudent)
    console.log ("estudantes", students)
    res.status(201).send("Aluno inserido com sucesso")

})

//Usei o express pra criar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")



//Configurando as coleções
// const ideas = [
//     {
//         img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title:" Cursos de Programação",
//         category:"Estudo",
//         description:"Com cursos de programação o seu desenvolvimento pode ser ainda maior, isso porque você foca nas mais atuais tecnologias de maneira prática e única, além de ser uma ótima oportunidade para quem quer se atualizar.",
//         url:"https://rocketseat.com.br/"
//     },

//     {
//         img:"https://image.flaticon.com/icons/svg/906/906201.svg",
//         title:"Exercicios",
//         category:"Saúde",
//         description:"Um estudo realizado na Universidade de British Columbia provou que a atividade física tem um efeito protetor no cérebro, melhorando a memória e as funções cognitivas e prevenindo o aparecimento de doenças degenerativas.",
//         url:"https://www.youtube.com/user/exercicioemcasa"
//     },

//     {
//         img:"https://image.flaticon.com/icons/svg/1830/1830774.svg",
//         title:"Meditação",
//         category:"Mentalidade",
//         description:"A meditação desenvolve uma progressiva capacidade de concentração e focalização. Sim, a meditação exige prática, paciência. Mas o próprio ato de meditar gera cada vez mais paciência.É uma ótima prática para quem quer relaxar e diminuir a ansiedade.",
//         url:"https://www.youtube.com/channel/UCTw4_Y7XXuorDLN5fdDWeIQ"
//     },

//     {
//         img:"https://image.flaticon.com/icons/svg/1973/1973685.svg",
//         title:"Cozinhar",
//         category:"Culinária",
//         description:"Cozinhar é uma terapia que contribui para o bem-estar e o equilíbrio emocional. Cozinhar ouvindo as músicas preferidas, preparar a comida pensando nas pessoas que irão se alimentar, os elogios que irá receber, faz você distrair e se desligar dos seus problemas.",
//         url:"https://www.tudogostoso.com.br/"
//     },

//     {
//         img:"https://image.flaticon.com/icons/svg/2159/2159664.svg",
//         title:"Karaokê",
//         category:"Diversão em família",
//         description:" Karaokê é um passatempo de origem japonesa no qual as pessoas cantam acompanhando versões instrumentais de músicas. Essa atividade é uma ótima ideia para uma diversão em família e descontraída.",
//         url:"https://www.youtube.com/user/TheKARAOKEChannel"
//     },

//     {
//         img:"https://image.flaticon.com/icons/svg/420/420317.svg",
//         title:"Pintura",
//         category:"Arte",
//         description:"Pintar numa tela, no papel ou em qualquer superfície que nos permita expressar pode ser uma forma de demonstrar sentimentos e pensamentos para pessoas que precisam se comunicar, mas não conseguem fazer isso de outra forma.",
//         url:"https://www.youtube.com/channel/UCBvoBuBZVSu8aMaexAKBeEA"
//     },

// ]

//Configurar arquivos estáticos(Css, scripts, imagens)
server.use(express.static("public"))


//Habilitaro uso do req.body
server.use(express.urlencoded({ extended: true }))


//Configurando o nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views",{
    express: server,
    noCache: false //boolean
})


//Pegando os dados do cliente

//Na página inicial
server.post("/", function(req, res){
    //Inserir dados na tabela
        const query = `
            INSERT INTO ideas(
                img,
                title,
                category,
                description,
                link
            ) VALUES (?,?,?,?,?);            
            `

        const values = [
            req.body.img,
            req.body.title,
            req.body.category,
            req.body.description,
            req.body.link
          
        ]

        db.run(query, values, function(err) {
            
            //Aviso sobre erro no banco de dados
            if(err) {
                console.log(err)
                return res.send("Erro no Banco de Dados!")
            }

            //Após cadastrar no sistema eu faço um redirecionamento
            return res.redirect("/ideias")
        }) 
})

server.get("/", function(req, res){

    //A lógica está dentro do "db" porque as minhas ideias estão
    //em "rows" e não mais em ideas
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        
        //Aviso sobre erro no banco de dados
        if(err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

            //Parar de mudar as ideias ao atualizar
            const reversedIdeas = [...rows].reverse() 

            const lastIdeas = []
            for (let idea of reversedIdeas) {
                if(lastIdeas.length < 3) {
                    lastIdeas.push(idea)
                } 
            }
            return res.render("index.html", { ideas: lastIdeas })
    })
})

//Na página de ideias
server.get("/ideias", function(req, res){


    //A lógica está dentro do "db" porque as minhas ideias estão
    //em "rows" e não mais em ideas
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        
        //Aviso sobre erro no banco de dados
        if(err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html",{ ideas: reversedIdeas})
    
    })
})


// Liguei meu servidor na porta 3000
server.listen(80)

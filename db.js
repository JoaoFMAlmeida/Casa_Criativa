const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {

    //Criar a tabela
        db.run(` 
            CREATE TABLE IF NOT EXISTS ideas( 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
                img TEXT,
                title TEXT,
                category TEXT,
                description TEXT,
                link TEXT
            )
        `)

    // //Inserir dados na tabela
        // const query = `
        // INSERT INTO ideas(
        //     img,
        //     title,
        //     category,
        //     description,
        //     link
        // ) VALUES (?,?,?,?,?);            
        // `

        // const values = [
            
        // ]

        // db.run(query, values, function(err) {
        //     if (err) return console.log(err)

        //     console.log(this)
        // }) 


    // Deletar um dado da tabela
    // db.run(`DELETE FROM ideas WHERE id = ?`, [], function(err){
    //     if (err) return console.log(err)

    //     console.log("Deletei", this)
    // })


    //Consultar dados na tabela
    // db.all(`SELECT * FROM ideas`, function(err, rows) {
    //     if(err) return console.log(err)

    //     console.log(rows)
    // })

    
    
})


//Exportando o banco de dados para o servidor

module.exports = db
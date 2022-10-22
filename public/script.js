function onOff() {
  document
   .querySelector("#modal")
   .classList
   .toggle("hide")

  document
   .querySelector("body")
   .classList
   .toggle("hideScrool")

  document
   .querySelector("#modal")
   .classList
   .toggle("addScroll")
}

//Conferir se modal e ideias estão todos seguindo os mesmos nomes de valores

function checkFields(event) {
  const valuesToCheck = [
    "img",
    "title",
    "category",
    "description",
    "link"
  ]

  /*Essa constante foi criada para indicar se tem campo vazio,
  ou seja, se ao enviar o fomurlário vai aparecer "true" e não undefined
  como o esperado */ 
  const isEmpty = valuesToCheck.find(function(value){
  
  const checkIfIsString = typeof event.target[value].value === "string"
  const checkIfIsEmpty = !event.target[value].value.trim()

    if (checkIfIsString && checkIfIsEmpty ) {
        return true
    }
  })

  /* Se tem "true" no isEmpty é pq tem campo vazio,
  então eu crio um novo if para alertar que tem campo
  vazio. */
  if(isEmpty) {
    event.preventDefault()
    alert("Por Favor, Preencher todos os campos!")
  }

}

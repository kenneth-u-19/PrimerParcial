const miPromesa = () =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const random = Math.random()
                if(random < 0.5){
                    resolve('hola mundo');
                }else{
                    reject('adios mundo')
                }
            
        }, 2000)
    })
}

//forma asincrona
console.log("Inicio de la promesa");

miPromesa().then((respuesta) => {
    console.log("La promesa se ha resuelto")
    console.log(respuesta)
}).catch((error) => {
    console.log("La promesa ha fallado")
    console.log(error)
}).finally(()=>{
    console.log("esto se ejecutara siempre al final de la promesa")
})

console.log("Fin de la promesa");



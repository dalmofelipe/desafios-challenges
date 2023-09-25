/*
 * Paginação
 */

/* ENUNCIADO
 *
 *  Você deve escrever uma função de paginação de listas que receba o número da página e o número de itens por página como parâmetros
 *  e retorne no seguinte formato:
 * 
 * 
 *  {
        currentPage: 1,
        perPage: 10,
        total: 20,
        totalPages: 2,
        data: [
            {
                userId: 1,
                id: 1,
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur (...)"
            },
            [...]
        ]
    }
 */

const posts = require('./posts.json')

const paginate = (collection = posts, pageNumber = 1, itemsPerPage = 10) => {
    // lança exception caso uma string seja passada no lugar de um array
    if(typeof(collection) === 'string') throw "Expect array and got string";

    // valida limites da paginação 
    let totalPosts = collection.length
    if(pageNumber < 1 || pageNumber > totalPosts) 
        throw "Page number value should be in range of collection size" 
    if(itemsPerPage < 10 || itemsPerPage > totalPosts) 
        throw "Items per pagem values should be greater than or equal 10 and lesser than collection max size" 

    // objeto de retorno
    let obj = {}
    obj['currentPage'] = pageNumber 
    obj['perPage'] = itemsPerPage
    obj['total'] = totalPosts
    // arredondamento para acima do total de paginas
    obj['totalPages'] = Math.ceil(totalPosts / itemsPerPage)

    // start do slice deve iniciar em 0, e depois ser proporcional a quantidade 
    // de itens por pagina. Uso de abs para garantir que sempre será valor positivo
    let pageStartSlice = Math.abs((itemsPerPage * pageNumber) - itemsPerPage)
    // fim do sclice apenas soma o start com total de itens por pagina
    let pageEndSlice = pageStartSlice + itemsPerPage
    
    obj['data'] = collection.slice(pageStartSlice, pageEndSlice)

    return obj
}

module.exports = paginate
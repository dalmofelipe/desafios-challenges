/*
 * Regex
 */

/* ENUNCIADO
 *
 * Escreva uma função que busque no texto os valores de "height" e "width"
 * e retorne um objeto { "height": x, "width": y } contendo esses valores ignorando sua medida (px, %, em).
 *
 * Ex:1
 * [INPUT]
 * "<div style="height: 20px; width: 60px;">"
 * [OUTPUT]
 * {
 *   height: 20,
 *   width: 60
 * }
 *
 * Ex: 2
 * [INPUT] String
 * "<div style="background-color: red;"> <img style="width: 120px; height: 20%" /></div>"
 * [OUTPUT] Object
 * {
 *   width: 120,
 *   height: 20
 * }
 */

const extractSize = htmlTemplate => {
    // string vazia retorna os atributos com valores zerados
    if(htmlTemplate.length == 0)
        return { width: 0, height: 0 }

    // objeto é definido vazio, pois é importante a ordem que os atributos aparecem no texto
    let obj = {}

    // aplica regex, esperando parsear pelo menos 2 substring dos atributos
    let results = htmlTemplate.match(/width: [0-9]+|height: [0-9]+/gm)

    // separa o atributo e valor gerando um array de arrays
    if(results.length >= 2)
        results = results.map(r => r.split(': '))

    // percorreo o array com atributo - valor 
    for(let result of results) {
        // vefica se o objeto de saida possui a chave do atributo, caso não tenha
        // o atributo é criado no objeto junto com seu respectivo valor convertido
        // em numero inteiro
        if(!obj.hasOwnProperty(result[0])) {
            obj[result[0]] = Number.parseInt(result[1])
        }
        // se o objeto de saida já possuir as duas chaves, o loop será interrompido
        if(obj.hasOwnProperty('width') && obj.hasOwnProperty('height')) break
    }
    return obj
}

module.exports = extractSize;

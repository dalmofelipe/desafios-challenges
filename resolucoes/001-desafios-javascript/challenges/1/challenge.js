/*
 * Calcular o MDC
 */

/* ENUNCIADO
 *
 * Você deve escrever uma função que calcula e retorna o MDC
 * (máximo divisor comum) entre dois números.
 * Para isso você pode usar as seguintes informações:
 *
 * 1. O MDC de um número N com 0 é o próprio N.
 *
 * 2. O MDC entre dois números M e N, onde M > N é
 * igual ao MDC de N e do resto da divisão de M por N.
 *
 * Você pode considerar que nas entradas dos testes
 * a > b sempre.
 */

const MDC = (a, b, c = a) => {
    if(a == 0) return b
    if(a == b -1) return 1

    let divisors = []
    let divisor = 2
    let primeIncremet = 1
    let modA = null
    let modB = null
    let modC = null

    while(a > 1 || b > 1 || c > 1) {
        // calcula resto da divisão das entradas
        modA = a % divisor
        modB = b % divisor
        modC = c % divisor

        // memoriza divisor quando for é multiplo de todos numeros de entrada
        if(modA == 0 && modB == 0 && modC == 0) {
            divisors.push(divisor)
        }
        // divisor é incrementado quando não for multiplo de nenhum dos numeros de entrada
        if(modA != 0 && modB != 0 && modC != 0) {
            divisor = divisor + primeIncremet
            primeIncremet++
        }
        // faz a divisão do numero de entrada se divisor for multiplo
        if(modA == 0) a = a / divisor
        if(modB == 0) b = b / divisor
        if(modC == 0) c = c / divisor
        if(primeIncremet > 20) break // proteção
    }
    // multiplica todos divisores comuns retorno resultado
    return divisors.reduce((a, b) => a * b, 1)
}

module.exports = MDC
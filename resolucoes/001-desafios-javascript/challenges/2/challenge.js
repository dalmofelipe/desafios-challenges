/*
 * Normalização de estruturas
 */

/* ENUNCIADO
 *
 * Você deve escrever uma função que realize a
 * normalização da estrutura representada pela variável input de
 * forma que o retorno seja compatível com a variável output
 *
 */

/*
 * [INPUT] Object
 * {
 *   "id": "6197b77e-3942-11ea-a137-2e728ce88125",
 *   "user": {
 *     "id": "6197ba94",
 *     "name": "Laura"
 *   },
 *   "reports": [
 *     {
 *       "id": "51ddf1a9",
 *       "result": {
 *         "document": "356.4325-10",
 *         "status": "em análise",
 *       }
 *     }
 *   ]
 * }
 *
 * [OUTPUT] Object
 *  {
 *   "results": {
 *     "6197b77e-3942-11ea-a137-2e728ce88125": {
 *       id: "6197b77e-3942-11ea-a137-2e728ce88125",
 *       user: "6197ba94",
 *       reports: ["51ddf1a9"]
 *     }
 *   },
 *   "users": {
 *     "6197ba94": { "id": "6197ba94", "name": "Laura" }
 *   },
 *   "reports": {
 *     "51ddf1a9": {
 *        "id": "51ddf1a9",
 *        "user": "6197ba94",
 *        "document": "356.4325-10",
 *        "status": "em análise",
 *      }
 *    }
 *  }
 */

const normalizeData = unormalized => {
    // instancia objetos previnir erros 
    let normalized = {}
    normalized['results'] = {}
    normalized['users'] = {}
    normalized['reports'] = {}

    // montando results, necessário apenas acessar elementos do obj desnormalizado
    normalized.results[unormalized.id] = {
        id: unormalized.id,
        user: unormalized.user.id,
        reports: unormalized.reports.map(r => r.id)
    }
    // users o mesmo acessar elementos do obj desnormalizado
    normalized.users[unormalized.user.id] = {
        id: unormalized.user.id,
        name: unormalized.user.name
    }
    // para os reports é necessário iterar no array desnormalizado, 
    // gerando key e values direto em reports normalizado
    unormalized.reports.map(r => {
        normalized.reports[r.id] = {
            id: r.id, 
            user: unormalized.user.id, 
            document: r.result.document, 
            status: r.result.status
        }
    })
    return normalized
}

module.exports = normalizeData

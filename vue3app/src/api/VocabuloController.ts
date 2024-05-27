class VocabuloController {
    // link pega nas controllers do backend
   
    public async getAll(){
        try {
            const response = await fetch('http://localhost:8080/vocabulo')
    
            const json = await response.json()
            return json
        
        } catch (error) {
            return []
        }
    }

    public async insert(vocabulo: Omit<Vocabulo, 'id'>){
        const request = await fetch('http://localhost:8080/vocabulo', {
            method: 'POST',
            body: JSON.stringify(vocabulo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return request.status == 200 || request.status == 204
    }

    public async getByTermoVersao(termo: string, versao: string){
        try {
            const response = await fetch(`http://localhost:8080/vocabulo/${termo}/${versao}`)
    
            const json = await response.json()
            return json
        
        } catch (error) {
            return []
        }
    }
}

// interface vem da entity no backend
interface Vocabulo {
    id: number
    termo: string
    significado: string
    versao: string
    dataHoraCadastro: string
    dataHoraDesativacao: string
}

const vocabuloController = new VocabuloController()

export {vocabuloController}
export type {Vocabulo}
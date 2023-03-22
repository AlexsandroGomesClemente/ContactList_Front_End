import React, {useState, useEffect} from 'react'
import ModalSave from './modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { api } from '../../api/api'
import '../../styles/Main.css'

export default function Main() {
  const [contacts, setContacts] = useState<any>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [operationType, setOperationType] = useState<string>("")
  const [idUser, setIdUser] = useState<number>(0)

  const getNumbers = async () => {
    const getNumber = await api.getAllNumber()
    setContacts(getNumber.data)
  }
  // Carrega a lista de contatos
    useEffect(()=> {
     
    getNumbers()
    }, [showModal])

  //Function para abrir e fechar os modais
  const modalCloser = (value: boolean)=> setShowModal(value)

  //Function para deletar contato
  const deleteContact = async (id:number) => {
    const response = await api.deleteContact(id);
    if ( response.status === true ) {
      getNumbers()
    }
  }

    return (
        <div className='Main-container'>
          <h3 className='Main-subtitle'>Lista de contatos:</h3>      
          <div className='Main-Table'>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Data de Nascimento</th>
                <th>CPF</th>
                <th>Telefone Principal</th>
                <th>Configurar</th>
              </tr>
            </thead>
            <tbody>

              {contacts.map((contact: any) => ( 
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.date_born}</td>
                <td>{contact.cpf}</td>
                <td>{contact.numbers[0].number}</td>
                <td className='Main-Td-Button'>
                <Button onClick={()=> {setShowModal(true); setOperationType("Editar"); setIdUser(contact.id)}} className='Main-botton' variant="outline-primary">  
                    <p>Editar</p>
                </Button>{' '}
                <Button onClick={()=> deleteContact(contact.id)} className='Main-botton' variant="outline-danger">
                  <p>Deletar</p>
                </Button>{' '}
                </td>
              </tr>) )}
            </tbody>
          </Table>   
          </div>
         

          <Button onClick={()=> {setShowModal(true); setOperationType("Adicionar")}} className='Main-botton-success' variant="outline-success">  
              <p>Adicionar</p>
          </Button>{' '}

          {showModal && <ModalSave closerModal={modalCloser} operation={operationType} idUser={idUser}/>}
        </div>
    )
} 
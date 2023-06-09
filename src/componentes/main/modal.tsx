import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../api/api';

interface Props  {
    closerModal: any,
    operation:string,
    idUser?: any,
}

function ModalSave(props: Props) {
  const [show, setShow] = useState(true);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dataNasc, setDataNasc] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');

  const handleClose = () => { setShow(false); props.closerModal(false)};

  // Load Contact 
  useEffect(()=> {
    if(props.operation === 'Editar') {
        const getContact = async () => {
            const getNumber = await api.getContact(props.idUser)
            setName(getNumber.data[0].name)
            setEmail(getNumber.data[0].email)
            setDataNasc(getNumber.data[0].date_born)
            setCpf(getNumber.data[0].cpf)
            setTelefone(getNumber.data[0].numbers[0].number)
          }
          getContact()
    }
  }, [])


  // Function de save ou edit 
  const endContact = async () => {
    const data : any = {
        name,
        numbers : [String(telefone)],
        email,
        cpf,
        date_born : dataNasc,
    }
    
    if( props.operation === 'Adicionar') {
        const response = await api.newContact(data)
        if ( response.status === true ) {
          toast.success(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            handleClose()
        }
    }

    
    if( props.operation === 'Editar') {
        const response = await api.putContact(props.idUser, data)
        if ( response.status === true ) {
          toast.success(response.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            handleClose()
        }
    }

  }

  return (
    <>
      <Modal show={show} onHide={handleClose} variant='dark'>
        <Modal.Header closeButton>
          <Modal.Title>{props.operation} Contato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                required
                value={name}
                onChange={(e)=> setName(e.target.value)}
                type="text"
                placeholder="Nome Completo"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                type="email"
                placeholder="email@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                required
                value={dataNasc}
                onChange={(e)=> setDataNasc(e.target.value)}
                type="date"
                placeholder="Data de Nascimento"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>CPF</Form.Label>
              <Form.Control
                required
                value={cpf}
                onChange={(e)=> setCpf(e.target.value)}
                type="text"
                placeholder="CPF"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                required
                value={telefone}
                onChange={(e)=> setTelefone(e.target.value)}
                type="phone"
                placeholder="Telefone"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="success" onClick={()=> endContact()}>
           {props.operation}
          </Button>
        </Modal.Footer>
      </Modal>
      < ToastContainer /> 
    </>
  );
}

export default ModalSave
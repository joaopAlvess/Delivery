import Pagina from '@/components/Pagina'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios'
import disciplinasValidator from '@/validators/disciplinasValidator'

const form = () => {

    const { push } = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()

    function salvar(dados) {
        axios.post('/api/disciplinas', dados)
        push('/disciplinas')
    }

    return (
        <Pagina titulo="Disciplina">
            <Form>
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control
                        isInvalid={errors.nome}
                        type="text"
                        placeholder='digite a nome'
                        {...register('nome', disciplinasValidator.nome)} />
                    
                    {
                        errors.nome &&
                        <p className='text-danger'>{errors.nome.message}</p>
                    } 
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="curso">
                    <Form.Label>Curso: </Form.Label>
                    <Form.Control 
                    isInvalid={errors.curso} 
                    type="text" 
                    placeholder='digite a curso'
                    {...register('curso', disciplinasValidator.curso)} />
                    {
                        errors.curso &&
                        <p className='text-danger'>{errors.curso.message}</p>
                    }
                </Form.Group>

                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/disciplinas">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
            </Form>
        </Pagina>
    )
}

export default form
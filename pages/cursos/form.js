import Pagina from '@/components/Pagina'
import React from 'react'
import {  Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import cursoValidator from '@/validators/cursoValidator'
import axios from 'axios'
import { IMaskInput } from 'react-imask'


const form = () => {
    
    const { push } = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()

    function salvar(dados) {
        axios.post('/api/cursos', dados)
        push('/cursos')
    }


    return (
        <Pagina titulo="Curso">

            <Form>
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome: </Form.Label>
                    <Form.Control                    
                    isInvalid={errors.nome} 
                    type="text" 
                    placeholder='digite seu nome'
                    {...register('nome', cursoValidator.nome)} />
                    {
                        errors.nome &&
                        <p className='text-danger'>{errors.nome.message}</p>
                    }

                </Form.Group>

                <Form.Group className="mb-3" controlId="duracao">
                    <Form.Label>Duração: </Form.Label>
                    <Form.Control 
                    as={IMaskInput}
                    mask='0 aaaaaaaaa'
                    isInvalid={errors.duracao} 
                    type="text" 
                    placeholder='digite a duração'
                    {...register('duracao', cursoValidator.duracao)} />
                    {
                        errors.duracao &&
                        <p className='text-danger'>{errors.duracao.message}</p>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="modalidade">
                    <Form.Label>Modalidade: </Form.Label>
                    <Form.Control isInvalid={errors.modalidade}
                    type="text" 
                    placeholder='digite a modalidade'
                    {...register('modalidade', cursoValidator.modalidade)} />
                    {
                        errors.modalidade &&
                        <p className='text-danger'>{errors.modalidade.message}</p>
                    }
                </Form.Group>

                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/cursos">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
            </Form>
        </Pagina>
    )
}

export default form
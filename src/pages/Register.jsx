import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    margin-bottom: 20px;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

function Register() {
    const [newEvent, setNewEvent] = useState({
        dataEvento: '',
        descricao: '',
        tema: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://apidev.gestaonaweb.com.br/Evento', newEvent, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            alert('Evento cadastrado com sucesso!');
            setNewEvent({ dataEvento: '', descricao: '', tema: '' });
            navigate('/');
        })
        .catch(error => {
            console.error('Erro ao cadastrar evento:', error);
        });
    };

    return (
        <Container>
            <Title>Cadastro de Evento</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Data do Evento:</Label>
                    <Input
                        type="datetime-local"
                        value={newEvent.dataEvento}
                        onChange={(e) => setNewEvent({ ...newEvent, dataEvento: e.target.value })}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Descrição:</Label>
                    <Input
                        type="text"
                        value={newEvent.descricao}
                        onChange={(e) => setNewEvent({ ...newEvent, descricao: e.target.value })}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Tema:</Label>
                    <Input
                        type="text"
                        value={newEvent.tema}
                        onChange={(e) => setNewEvent({ ...newEvent, tema: e.target.value })}
                        required
                    />
                </FormGroup>
                <Button type="submit">Cadastrar Evento</Button>
                <Button type="button" onClick={() => navigate('/')}>Cancelar</Button>
            </Form>
        </Container>
    );
}

export default Register;
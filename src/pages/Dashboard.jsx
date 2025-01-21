import React, { useEffect, useState } from 'react';
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

const Button = styled.button`
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
`;

const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

function Dashboard() {
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('https://apidev.gestaonaweb.com.br/Evento', {
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => {
            setEventos(response.data);
        })
        .catch(error => {
            console.error('Erro ao buscar eventos:', error);
        });
    }, []);

    return (
        <Container>
            <Title>Eventos</Title>

            <Button onClick={() => navigate('/register')}>Cadastrar Evento</Button>

            <h2>Lista de Eventos</h2>
            <Table>
                <thead>
                    <tr>
                        <Th>ID</Th>
                        <Th>Data do Evento</Th>
                        <Th>Descrição</Th>
                        <Th>Tema</Th>
                        <Th>Data de Inclusão</Th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map((evento) => (
                        <tr key={evento.id}>
                            <Td>{evento.id}</Td>
                            <Td>{new Date(evento.dataEvento).toLocaleString()}</Td>
                            <Td>{evento.descricao}</Td>
                            <Td>{evento.tema}</Td>
                            <Td>{new Date(evento.dataInclusao).toLocaleString()}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Dashboard;
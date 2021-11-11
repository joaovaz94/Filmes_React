import React, { useEffect, useState } from 'react'
import { Card, CardImg, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'

const FilmesPopulares = () => {

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{

        const promessa = apiFilmes.get('/movie/popular?language=pt-BR')

        promessa.then(resultado=>{
            setFilmes(resultado.data.results)
        })

    }, [])

    return (
        <div>
           <h1>Filmes Populares</h1> 
            <Row>
                {filmes.map(filme => (
                    <Col key={filme.id} md={3} className="mb-3">
                        <Card>
                            <CardImg variant="top" src={'https://image.tmdb.org/t/p/w500/' + filme.backdrop_path} />
                            <Card.Body>
                                <p>{filme.title}</p>
                                <p>({filme.original_title})</p>
                                <Link to={'/filmes/' + filme.id} className="btn btn-danger">Detalhes</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default FilmesPopulares

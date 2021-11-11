import React, { useEffect, useState } from 'react'
import { Card, CardImg, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'

const FilmesDetalhes = (props) => {

    const [filme, setFilme] = useState({})
    const [atores, setAtores] = useState([])

    useEffect(()=>{
        const id = props.match.params.id

        apiFilmes.get('/movie/' + id + '?language=pt-BR').then(resultado=>{
           setFilme(resultado.data) 
        })

        apiFilmes.get('/movie/' + id + '/credits?language=pt-BR').then(resultado=>{
           setAtores(resultado.data.cast) 
        })

    }, [props])
    
    return (
        <div>
            {!filme.id && <h1>Carregando ...</h1>}
            {filme.id &&
                <Row>
                    <Col md={3}>
                        <Card>
                            <CardImg variant="top" src={'https://image.tmdb.org/t/p/w500/' + filme.poster_path} />
                        </Card>
                    </Col>
                    <Col md={9}>
                        <h1>{filme.title}</h1>
                        {
                            filme.budget > 0 &&
                            <p>Orçamento: {filme.budget}</p>
                        }
                        <p>Data de Lançamente: {filme.release_date}</p>
                        <p>{filme.overview}</p>
                        <Link to="/filmes/populares" className="btn btn-danger">Voltar</Link>
                    </Col>
                    <Col md={12}>
                        <h2>Atores</h2>
                        <Row>
                            {atores.map(ator => (
                                <React.Fragment key={ator.id}>
                                    {ator.profile_path &&
                                        <Col md={1} >
                                            <Card title={ator.name}>
                                                <Link to={'/atores/' + ator.id}><CardImg variant="top" src={'https://image.tmdb.org/t/p/w500/' + ator.profile_path} /></Link>
                                            </Card>
                                        </Col>
                                    }
                                </React.Fragment>
                            ))}
                        </Row>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default FilmesDetalhes
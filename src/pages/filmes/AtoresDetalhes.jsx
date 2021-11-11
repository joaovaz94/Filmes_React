import React, { useEffect, useState } from 'react'
import { Card, CardImg, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import apiFilmes from '../../services/apiFilmes'

const AtoresDetalhes = (props) => {

    const [ator, setAtor] = useState({})
    const [filmes, setFilmes] = useState([])

    useEffect(()=>{
        const id = props.match.params.id

        apiFilmes.get('/person/' + id + '?language=pt-BR').then(resultado=>{
           setAtor(resultado.data) 
        })

        apiFilmes.get('/person/' + id + '/credits?language=pt-BR').then(resultado=>{
           setFilmes(resultado.data.crew) 
        })

    }, [props])

    return (
        <div>
            {!ator.id && <h1>Carregando ...</h1>}
            {ator.id &&
               <Row>
                   <Col md={3}>
                        <Card>
                            <CardImg variant="top" src={'https://image.tmdb.org/t/p/w500/' + ator.profile_path} />
                        </Card>
                   </Col>
                   <Col md={9}>
                       <h1>{ator.name}</h1>
                       <p>Nascimento: {ator.birthday}</p>
                       <p>{ator.place_of_birth}</p>
                       <p><a href={'https://www.imdb.com/name/' + ator.imdb_id} target="_blank" rel="noreferrer">imdb</a></p>
                       <p>{ator.biography}</p>
                       <Link to="/filmes/populares" className="btn btn-danger">Voltar para Filmes</Link>
                   </Col>
                    <Col md={12}>
                        <h2>Filmes</h2>
                        <Row>
                            {filmes.map(filme => (
                                <React.Fragment key={filme.id}>
                                    {filme.poster_path &&
                                        <Col md={1} >
                                            <Card title={ator.name}>
                                                <Link to={'/filmes/' + filme.id}><CardImg variant="top" src={'https://image.tmdb.org/t/p/w500/' + filme.poster_path} /></Link>
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

export default AtoresDetalhes
import { useEffect, useRef, useState } from 'react';
import cards_data from '../../assets/cards/Cards_data';
import './TitleCards.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const TitleCards = ({ title, category }) => {
    const cardsRef = useRef();
    const [apiData, setApiData] = useState([]);
    const navigate = useNavigate();


    const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    }
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWI2MTZkMGU1ZDM2MmZhODE2ZmRmMTA4YzJmZTYzZiIsInN1YiI6IjY2MmRjZDMyNjBjNzUxMDEyMzY0YmE1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ItvRwPWrjBSq35ImHoOqO62PQwVRvvdCGn3Baz2UjA'
        }
    };

    useEffect(() => {


        axios.get(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
            .then((response) => {
                setApiData(response.data.results)
            }
            )
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])



    return (
        <div className='title-cards'>
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {
                    apiData.map((card, i) => {
                        return <div   onClick={() => navigate(`/player/${card.id}`)} className='card' key={i}>
                            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                            <p>{card.original_title}</p>
                        </div>

                    })
                }
            </div>
        </div>
    )
}

export default TitleCards
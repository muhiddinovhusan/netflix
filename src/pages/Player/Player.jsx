import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Player = () => {
    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: '',
        typeof: ""
    })
    const { id } = useParams();
const navigate = useNavigate();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWI2MTZkMGU1ZDM2MmZhODE2ZmRmMTA4YzJmZTYzZiIsInN1YiI6IjY2MmRjZDMyNjBjNzUxMDEyMzY0YmE1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ItvRwPWrjBSq35ImHoOqO62PQwVRvvdCGn3Baz2UjA'
        }
    };

    useEffect(() => {


        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&page=1`, options)
            .then((response) => {
                setApiData(response.data.results[0])
            }
            )
            .catch(err => console.error(err));

    }, [])


    return (
        <div className='player'>
            <img src={back_arrow} alt="" onClick={()=>{navigate(-2)}} />
            <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} title="YouTube video player" frameBorder="0" ></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player
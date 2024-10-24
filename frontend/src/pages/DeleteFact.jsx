import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from './../components/BackButton';


const DeleteFact = () => {

    const [fact, setFact] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/facts/${id}`)
            .then(response => {
                setFact(response.data);
                console.log(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [id]);

    const handleDeleteFact = () => {
        const conf = confirm("Are you sure?")

        if (!conf) {return}

        setLoading(true);
        axios
            .delete(`http://localhost:5555/facts/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('Ошибка. Смотрите сообщение в консоли')
                console.log(error)
            })
    }


    return (
        <>
            <BackButton />
            <div>Delete Fact</div>
            {loading ? (<p>Loading...</p>) : ''}
            <ul>

                <li>Id: {fact._id}</li>
                <li>Title: {fact.title}</li>
                <li>Source: {fact.source}</li>
                <li>Category: {fact.category}</li>
                <li>Image Link: {fact.image}</li>

                <li>Created: {new Date(fact.createdAt).toLocaleString()}</li>
                <li>Updated: {new Date(fact.updatedAt).toLocaleString()}</li>
            </ul>

            <button
                className="btn btn-danger"
                type="button"
                onClick={handleDeleteFact}
            >
                Удалить
            </button>


        </>
    );
}

export default DeleteFact;
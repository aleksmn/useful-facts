import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from './../components/BackButton';


const EditFact = () => {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/facts/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setText(response.data.text);
                setSource(response.data.source);
                setCategory(response.data.category);
                setImage(response.data.image);


                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, [id]);

    const handleEditFact = () => {
        const data = {
            title, text, source, category, image
        };
        setLoading(true);
        axios
            .put(`http://localhost:5555/facts/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('Ошибка. Смотрите сообщение в консоли')
                console.log(error)
            })
    };

    return ( 
        <>
            <BackButton />
            <h1>Edit Fact</h1>
            {loading ? <p>Loading...</p> : ''}

            <form>
                <p>
                    <label className="form-label">Title</label>
                    <input
                        id='titleInput'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                </p>
                <p>
                    <label className="form-label">Text</label>
                    <textarea
                        id='textInput'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="form-control"
                        rows="12"
                    ></textarea>
                </p>
                <p>
                    <label className="form-label">Source</label>
                    <input
                        id='sourceInput'
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="form-control"
                    />
                </p>
                <p>
                    <label className="form-label">Category</label>
                    <input
                        id='categoryInput'
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-control"
                    />
                </p>
                <p>
                    <label className="form-label">Image URL</label>
                    <input
                        id='imageInput'
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="form-control"
                    />
                </p>

                <button type="button" onClick={handleEditFact}>
                    Save
                </button>

            </form>

        </>
     );
}
 
export default EditFact;
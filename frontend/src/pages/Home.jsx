import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle, BsPencil, BsTrash, BsPlusSquare } from 'react-icons/bs'

const Home = () => {
    const [facts, setFacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/facts")
            .then(response => {
                // console.log(response.data);
                setFacts(response.data.data);
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return ( 
        <>
            <h1 className="display-4">Useful Facts</h1>
            <Link to="/facts/create" className="create-icon">
                <BsPlusSquare />
            </Link>


            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Title</th>
                            <th>Text</th>
                            <th>Source</th>
                            <th>Category</th>
                            <th>ImageURL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facts.map((fact, index) => (
                            <tr key={fact._id}>
                                <td>{index + 1}</td>
                                <td>{fact.title}</td>
                                <td>{fact.text}</td>
                                <td>{fact.source}</td>
                                <td>{fact.category}</td>
                                <td>{fact.image}</td>
                                <td className="icons">
                                    <Link to={`/facts/details/${fact._id}`} className="icons__details">
                                        <BsInfoCircle />
                                    </Link>
                                    <Link to={`/facts/edit/${fact._id}`} className="icons__edit">
                                        <BsPencil />
                                    </Link>
                                    <Link to={`/facts/delete/${fact._id}`}  className="icons__delete">
                                        <BsTrash />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
        </>
     );
}
 
export default Home;
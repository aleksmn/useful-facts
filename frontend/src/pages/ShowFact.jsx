import { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const ShowFact = () => {
    const [fact, setFact] = useState([]);
    const [loading, setLoading] = useState(false);
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

    return ( 
        <>
            <BackButton />
            <div>Fact Info</div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>

                <li>Id: {fact._id}</li>
                <li>Title: {fact.title}</li>
                <li>Source: {fact.source}</li>
                <li>Category: {fact.category}</li>
                <li>Image Link: {fact.image}</li>

                <li>Created: {new Date(fact.createdAt).toLocaleString()}</li>
                <li>Updated: {new Date(fact.updatedAt).toLocaleString()}</li>
            </ul>
            )}
        </>

     );
}
 
export default ShowFact;
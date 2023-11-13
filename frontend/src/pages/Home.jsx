import { useState } from "react";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/BooksCard";
import BooksTable from "../components/BooksTable";
import { useSnackbar } from "notistack";
import LogoutButton from "../components/LogoutButton";

export default function Home({keycloak}) {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);

        const bearerToken = localStorage.getItem("react-token");

        const axiosConfig = {
            headers: { Authorization : `Bearer ${bearerToken}`}
        }

        axios.get('http://localhost:8080/api/books',axiosConfig)
        .then((response) => {
            setBooks(response.data);
            setLoading(false);
        })
        .catch((error) => {
            enqueueSnackbar(error, { variant: "error"})
            setLoading(false);
        });
    }, []);

    return (
        <div className="p-4">
            <LogoutButton keycloak={keycloak} />
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('table')}>
                    Table
                </button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('card')}>
                    Card
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Book List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            { loading ? (<Spinner />) :  (showType === 'table' ? (<BooksTable books={books}/>) : (<BooksCard books={books}/>))}

        </div>
    )    
}
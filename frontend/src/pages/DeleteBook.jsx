import axios from "axios";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import BlackButon from "../components/BlackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

export default function DeleteBook() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    
    function handleDeleteBook() {
        setLoading(true);

        const bearerToken = localStorage.getItem("react-token");

        const axiosConfig = {
            headers: { Authorization : `Bearer ${bearerToken}`}
        }

        axios.delete(`http://localhost:8080/api/books/${id}`, axiosConfig)
        .then(() => {
            setLoading(false);
            enqueueSnackbar("Book deleted successfully", { variant: "success"});
            navigate('/')
        })
        .catch((error) => {
            enqueueSnackbar(error, { variant: "error"})
        });
    }

    return (
        <div className="p-4">
            <BlackButon/>
            <h1 className="text-3xl my-4">Delete Book</h1>
            {loading ? (<Spinner/>) : ("")}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
                <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
                <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
                    Yes!
                </button>
            </div>
        </div>
    )    
}
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlackButton from "../components/BlackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

export default function EditBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setLoading(true);
        
        const bearerToken = localStorage.getItem("react-token");

        const axiosConfig = {
            headers: { Authorization : `Bearer ${bearerToken}`}
        }

        axios.get(`http://localhost:8080/api/books/${id}`, axiosConfig)
        .then((response) => {
            setLoading(false);
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPublishYear(response.data.publishYear);
        })
        .catch((error) => {
            setLoading(false);
            enqueueSnackbar(error, { variant: "error"})
        });
    }, []);

    function handleEditBook() {
        const data = { title, author, publishYear };
        setLoading(true);
        axios.put(`http://localhost:8080/api/books/${id}`, data)
        .then(() => {
            setLoading(false);
            enqueueSnackbar("Book updated successfully", { variant: "success"});
            navigate("/");
        })
        .catch((error) => {
            setLoading(false);
            enqueueSnackbar(error, { variant: "error"})
        });
    }

    return (
    <div className="p-4">
        <BlackButton/>
        <h1 className="text-3xl my-4">Edit Book</h1>
        {loading ? (<Spinner/>) : ("")}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full "/>
            </div>
            <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full "/>
            </div>
            <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                <input type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full "/>
            </div>
            <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
                Save
            </button>
        </div>
    </div>
    );
}
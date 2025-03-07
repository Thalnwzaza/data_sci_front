import axios from "axios";
import { useState } from "react";
import SideBarHistory from "../component/SideBarHistory";

function Main(){
    const HOSTNAME = 'http://127.0.0.1:5000/'
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [result, setResult] = useState(null);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('');


    const handleClosePopUp = () => {
        setIsPopupOpen(false);
        setImage(null);
        setFileName(null);
    };

    const historyMake = (file) => {
        const newHistory = {
            imageFile: URL.createObjectURL(file),
            accuracy: {short:0, long:0}, // ความแม่นยำการทำนาย
        };
        const cloneHistory = [...history, newHistory];
        setHistory(cloneHistory);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        setFileName(e.target.files[0].name);
        setImage(URL.createObjectURL(e.target.files[0]));
        formData.append('file', e.target.files[0]);
        try {    
            const response = await axios.post(`${HOSTNAME}uploads`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if(response.data.status === 200){
                setIsPopupOpen(true);
                historyMake(e.target.files[0]);
            }else{
                console.error(response.data.message);
            }
           
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            {
                isPopupOpen && (
                    <div>
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-4 rounded-lg">
                                <div className="flex justify-end">
                                    <button onClick={() => handleClosePopUp()} className="text-red-500">X</button>
                                </div>
                                <img src={image} alt="image" className="w-96 h-96 object-cover" />
                            </div>
                        </div>
                    </div>
                
                )
            }
            <SideBarHistory history={history}/>
            <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-50 ml-64"> 
                <h1 className="first-letter:uppercase font-bold text-2xl">Is this long cloat or short cloat?</h1>
                <div>
                    <div className="px-32 py-6 grid grid-cols-1 gap-[2px] place-items-center border-[3px] border-dashed border-gray-400 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-gray-400">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                        </svg>
                        <input
                            type="file"
                            id="custom-file"
                            onChange={(e) => handleUpload(e)}
                            hidden={true}
                        />
                        <label
                            htmlFor="custom-file"
                            className="inline-flex justify-center w-72   text-xl text-white py-2 px-4
                                        rounded-full border-0 font-semibold bg-blue-600
                                        hover:bg-blue-500 cursor-pointer"
                        >
                            Select a photo 
                        </label>
                        <label className="text-sm text-slate-500">{fileName}</label>
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default Main;
import axios from "axios";
import { useState } from "react";

function Main(){
    const HOSTNAME = 'http://127.0.0.1:5000/'
    const [image, setImage] = useState(null);


    const handleImage = (e) => {
        setImage(
            e.target.files[0]
        )
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image);
        try {    
            const response = await axios.post(`${HOSTNAME}uploads`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return(
        <div> 
            <h1 className="font-light">ระบบแยกเสื้อแขนสั้นและแขนยาวด้วย Image Processing</h1>
            <div className="w-96">
                <form onSubmit={(e) => handleUpload(e)} className="flex items-center gap-2">
                    <div>
                        <input
                            className="relative  m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFile"
                            onChange={(e) => handleImage(e)}
                        />
                    </div>
                    <button type="submit" className= "bg-orange-400 text-white text-lg font-medium  w-fit h-fit px-6 py-[2px] rounded-full">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default Main;
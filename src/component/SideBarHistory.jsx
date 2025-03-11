import { useState } from "react";

function SideBarHistory({ history }) {
    // ใช้ useState ในการจัดการข้อมูลหน้าปัจจุบัน
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;  // จำนวนไอเทมที่จะแสดงในแต่ละหน้า

    // คำนวณ index ของไอเทมที่จะแสดงในหน้าแรก
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // หั่นข้อมูลเพื่อแสดงแค่จำนวนไอเทมที่ต้องการในแต่ละหน้า
    const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

    // ฟังก์ชันสำหรับการเปลี่ยนหน้า
    const nextPage = () => {
        if (currentPage < Math.ceil(history.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };


    

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="mt-4 w-60">
            <div className="flex flex-col gap-2">
                {currentItems.map((item, index) => (
                    <div key={index} className="shadow-xl rounded-xl">
                        <img
                            src={item.imageFile}
                            alt={item.imageFile}
                            className="w-full rounded-t-xl h-40 object-cover"
                        />
                        <div className="px-2 py-2">
                            <h1 className="text-base overflow-hidden">Name: {item.name}</h1>
                            <p className="text-xs">แขนสั้น</p>
                            <div className="border w-full h-5">
                                <div
                                    className="bg-green-400 h-full flex items-center"
                                    style={{ width: `${item.short.toFixed(2)}%` }}
                                >
                                    <span className="text-xs pl-[1px]">{item.short.toFixed(2)}%</span>
                                </div>
                            </div>
                            <p className="text-xs">แขนยาว</p>
                            <div className="border w-full h-5">
                                <div
                                    className="bg-green-400 h-full flex items-center"
                                    style={{ width: `${item.long.toFixed(2)}%` }}
                                >
                                    <span className="text-xs pl-[1px]">{item.long.toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ปุ่มสำหรับเปลี่ยนหน้า */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={prevPage}
                    className="bg-blue-600 px-4 py-2 text-white rounded-md disabled:opacity-50 hover:bg-blue-500"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <button
                    onClick={nextPage}
                    className="bg-blue-600 px-4 py-2 text-white rounded-md disabled:opacity-50 hover:bg-blue-500"
                    disabled={currentPage === Math.ceil(history.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default SideBarHistory;

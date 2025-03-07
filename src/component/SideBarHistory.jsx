function SideBarHistory({history}) {
    return(
        <aside id="default-sidebar" className="border shadow-lg bg-white fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <h4 className="text-xl text-start pl-4 pt-4 font-bold">History</h4>
            <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
                { history.length > 0 && history.map((item, index) => (
                    <div className="card-hero border shadow-sm rounded-2xl" key={index}>
                         <img src={item.imageFile} alt="image" className="w-26 h-26 object-cover rounded-t-xl"/>
                         <div className="class-info p-2 pb-4 mt-2">
                            <p className="text-xs">Short</p>
                            <div className="border w-full">
                                <div className="inline-flex items-center h-5 bg-green-500" style={{ width: `${item.accuracy.short}%` }}>
                                    <span className="pl-1">{item.accuracy.short}%</span>
                                </div>
                            </div>
                            <p  className="text-xs">Long</p>
                            <div className="border w-full">
                                <div className="inline-flex items-center h-5 bg-green-500" style={{ width: `${item.accuracy.long}%` }}>
                                    <span className="pl-1">{item.accuracy.long}%</span>
                                </div>
                            </div>
                         </div>
                    </div>
                ))
                }
                { history.length === 0 && (
                    <div>No uploads hisroty</div>
                )}
            </div>
        </aside>
    );
};
export default SideBarHistory;
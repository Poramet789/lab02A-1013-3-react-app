import { useState, useEffect } from "react";

export default function HerbLists() {
    const [loadStatus, setLoadStatus] = useState(true);
    const [herbData, setHerbData] = useState([]);

    useEffect(() => {
        const fetchHerbData = async () => {
            const response = await fetch('/api/herbs');
            if (response.ok) {
                const hbJson = await response.json();
                setHerbData(hbJson);
            } else {
                alert('[ERR] Unable to read data.');
            }
            setLoadStatus(false);
        };

        fetchHerbData().catch(console.error);
    }, [loadStatus]);

    const handleDelete = async (hbId) => {
        try {
            const response = await fetch(`/api/deleteHerb/${hbId}`, { 
                method: 'DELETE'
            });
            if (response.ok) {
                const myJson = await response.json();
                alert(myJson.message);
                setLoadStatus(true); // Refresh the list
            } else {
                alert('[ERR] An error when deleting data.');
            }
        } catch (error) {
            alert('[ERR] An error occurs when deleting the data.');
        }
    };
    
    return (
        <div className="m-3">
            <a href='/lab02/herbForm'>[ เพิ่มข้อมูลสมุนไพร ]</a>
            <h1 className="font-bold">รายการสมุนไพร</h1>
            {herbData.map((h_item, index) => 
                <div key={index}>
                    <div className="font-bold p-2 m-2 border-2 rounded-lg">
                        ชื่อสมุนไพร: {h_item.hbName}<br />
                        รายละเอียด: {h_item.hbDesc}<br />
                        หมวดหมู่: {h_item.hbCate}<br />
                        สรรพคุณ: {h_item.hbProp}<br />
                        ผู้ผลิต: {h_item.hbSupp}<br />
                    </div>
                    <div className="p-2 m-2">
                        <a href={`/lab02/herbDetail/${h_item.hbId}`}>[ รายละเอียด ]</a>
                        <a href={`/lab02/herbEdit/${h_item.hbId}`}>[ แก้ไข ]</a>
                        <a href="#" onClick={() => handleDelete(h_item.hbId)}>[ ลบ ]</a>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";

export default function HerbDetail() {
    const myParams = useParams();
    const hbId = myParams.hbId;
    const [hbData, setHerbData] = useState({});

    useEffect(() => {
        const fetchHerbData = async () => {
            const response = await fetch(`/api/herbs/${hbId}`);
            if (response.ok) {
                const hbJson = await response.json();
                setHerbData(hbJson);
            } else {
                alert('[ERR] Failed to load data.');
            }
        };

        fetchHerbData().catch(console.error);
    }, [hbId]);

    return (
        <div className="m-3">
            <a href='/lab02/herbLists'>[ ข้อมูลสมุนไพร ]</a>
            <h1 className="font-bold">รายละเอียดสมุนไพร</h1>
            <div key={hbId}>
                <div className="font-bold p-2 m-2 border-2 rounded-lg">
                    ชื่อสมุนไพร: {hbData.hbName}<br />
                    รายละเอียด: {hbData.hbDesc}<br />
                    หมวดหมู่: {hbData.hbCate}<br />
                    สรรพคุณ: {hbData.hbProp}<br />
                    ผู้ผลิต: {hbData.hbSupp}<br />
                </div>
            </div>
            <a href='/lab02/herbLists'>[ ย้อนกลับ ]</a>
        </div>
    );
}

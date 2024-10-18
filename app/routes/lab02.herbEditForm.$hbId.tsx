import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";

export default function HerbEditForm() {
    const navigate = useNavigate();
    const myParams = useParams();
    const hbId = myParams.hbId;
    const [hbData, setHerbData] = useState({});
    const [cateOption, setCateOption] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHerbData({
          ...hbData,
          [name]: value
        });
    };

    useEffect(() => {
        const fetchHerbData = async () => {
            const response = await fetch(`/api/herbs/${hbId}`);
            if (response.ok) {
                const hbJson = await response.json();
                setHerbData(hbJson);
                setCateOption(hbJson.hbCate);
            } else {
                alert('[ERR] Failed to load data.');
            }
        };

        fetchHerbData().catch(console.error);
    }, [hbId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirm('Confirm the information update?')) {
            const formJson = { ...hbData, hbId };
            const resHerb = await fetch('/api/updateHerb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });

            if (resHerb.ok) {
                const myJson = await resHerb.json();
                alert(myJson.message);
                navigate('/lab02/herbLists');
            } else {
                alert('[ERR] Failed to update the form.');
            }
        }
    };

    return (
        <div className="m-3">
            <a href='/lab02/herbLists'>[ ข้อมูลสมุนไพร ]</a>
            <h1 className="font-bold">อัปเดตข้อมูลสมุนไพร</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="hbId" value={hbId} />
                <label>ชื่อสมุนไพร (*)</label>:<br />
                <input type="text" name="hbName" className="border rounded-lg p-2 w-1/2"
                onChange={handleChange} value={hbData.hbName || ''} required /><br />
                <label>รายละเอียด</label>:<br />
                <textarea rows={3} name="hbDesc" className="border rounded-lg p-2 w-1/2"
                    onChange={handleChange} value={hbData.hbDesc || ''} /><br />
                <label>หมวดหมู่ (*)</label>:<br />
                <select name="hbCate" className="border rounded-lg p-2 w-1/2"
                value={cateOption} onChange={handleChange} required>
                    <option value="">-เลือกหมวดหมู่-</option>
                    <option value={10}>ราก</option>
                    <option value={20}>เปลือกไม้</option>
                    <option value={30}>เนื้อไม้</option>
                    <option value={40}>ใบ</option>
                    <option value={50}>อื่น ๆ</option>
                </select><br />
                <label>สรรพคุณ (*)</label>:<br />
                <textarea rows={3} name="hbProp" className="border rounded-lg p-2 w-1/2"
                    onChange={handleChange} value={hbData.hbProp || ''} required /><br />
                <label>ผู้ผลิต</label>:<br />
                <input type="text" name="hbSupp" className="border rounded-lg p-2 w-1/2"
                onChange={handleChange} value={hbData.hbSupp || ''} /><br />
                <div className="p-3">
                    <button type="submit">[ Submit ]</button>
                    <button type="reset">[ Reset ]</button>
                </div>
            </form>
        </div>
    );
}

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from './Loading';
function Kakao_Loading() {

    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");
    let [temp, setTemp] = useState(true);
    useEffect(() => {
        axios.get('/kakao/oauth', {
            params: {
                code: code,
            }
        }).then(response => {
            console.log(response.data.infos.nickname);
            axios.post(response.data.url, {
                name: response.data.infos.nickname,
                id: response.data.infos.email,
            }).then(response => {
                setTemp(false);
                console.log(response.data);
                window.location.href = response.data;
            })

        }).catch(error => {
            console.log(error.response.data.resultCode);
            console.log(error.response.data.result);
            window.alert(error.response.data.result);
            navigate("/login")
        })

    }, [])


    return (
        <div className="LoginHandeler">
            <div className="alert alert-warning">
                {
                    temp == true ? <Loading /> : null
                }
            </div>
        </div>
    );
};

export default Kakao_Loading;
import { ArrowLeft } from "lucide-react"
import './verify.scss'
import Backbtn from "./Backbtn"

function Verify(){
    const { t } = useTranslation();
    return(
        <div className="verify-wrapper">
            <Backbtn/>
            <div className="content">
                <h1>t("Verify")</h1>
                <p>t("We sent a code to your number")</p>
                <div className="input-otp">
                    <input type="text" className="input-btn"></input>
                    <input type="text" className="input-btn"></input>
                    <input type="text" className="input-btn"></input>
                    <input type="text" className="input-btn"></input>
                </div>
                <button className="verify-btn">t("Verify")</button>
            </div>
        </div>
    )
}
export default Verify

import { ArrowLeft } from "lucide-react"
import './verify.scss'
import  Accessibility from './Accessibility.jsx'
import Backbtn from "./Backbtn"

function Verify(){
    return(
        <div className="verify-wrapper">
            <Accessibility/>
            <Backbtn/>
            <div className="content">
                <h1>Verify</h1>
                <p>We sent a code to your number</p>
                <div className="input-otp">
                    <input type="text" className="input-btn"></input>
                    <input type="text" className="input-btn"></input>
                    <input type="text" className="input-btn"></input>
                    <input type="text" className="input-btn"></input>
                </div>
                <button className="verify-btn">Verify</button>
            </div>
        </div>
    )
}
export default Verify

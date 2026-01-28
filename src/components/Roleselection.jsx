import { Tractor, Handshake } from "lucide-react"
import Backbtn from "./Backbtn"
import Accessibility from "./Accessibility"
import './roleselection.scss'


function Roleselection(){
    return(
        <div className="roleselection-wrapper">
            <Backbtn/>
            <Accessibility/>
            <div  className="two-btn">
                <h2>Select you role</h2>
                <button className="tractor">
                    <Tractor className="icon"/>
                    <div className="tractor-content">
                        <h3>I am a Farmer</h3>
                        <p className="para">Manage your crops and sales</p>
                    </div>
                    
                </button>
                <button className="handshake">
                    <Handshake className="icon"/>
                    <div className="handshake-content">
                        <h3>I am a Buyer</h3>
                        <p className="para">Explore and purchase fresh produce</p>
                    </div>
                    
                </button>
            </div>
        </div>
    )
}

export default Roleselection

import { ChevronLeft } from "lucide-react"
import './backbtn.scss'

function Backbtn(){
    return(
        <button className="back-btn">
            <ChevronLeft />
            Back    
        </button>
    )
}

export default Backbtn
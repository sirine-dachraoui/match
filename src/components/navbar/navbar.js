import { Link } from "react-router-dom";
import './navbar.scss'

export default function Navbar() {


    return (
        <nav>
            <Link to="/add-match"> Add A Match </Link>
            <Link to="/matches"> Scheduled Matches </Link>
        </nav>
    )
}
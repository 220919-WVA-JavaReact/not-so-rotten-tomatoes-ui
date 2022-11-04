import { Navigate } from "react-router-dom";
import { User } from "../../models/user";


interface IDashProps{
    currentUser: User | undefined;
}

function Dashboard(props: IDashProps){
    return(
        props.currentUser?
        <p>
        Welcome to the dashboard, {props.currentUser?.username}!
        </p>
        :
        <Navigate to="/login"/>
    );
}
export default Dashboard;
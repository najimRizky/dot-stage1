import { connect } from "react-redux/es/exports";
import { Navigate } from "react-router-dom";

const Home = ({user}) => {
    console.log(user)
    return (  
        <>
            {user ? (
                <h1>Home</h1>
            ) : (
                <Navigate to="/login" replace={true} />
            )}
            
        </>
    );
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}
 
export default connect(mapStateToProps)(Home);
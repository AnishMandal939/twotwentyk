import { useAuth0 } from "@auth0/auth0-react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setAppToken } from "redux/action/token/tokenAction";

export default function Homepage() {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAppToken(""));
    window.sessionStorage.removeItem("user_role");
    localStorage.setItem("theme", "Light");
    logout({
      returnTo: window.location.origin,
      federated: true,
    });
  };
  return (
    <>
      <div className="mx-4 py-3">
        <Container fluid className="globalMaxWidthContainerNotImportant">
          <div className="float-end">
            <Button
              onClick={handleLogout}
              icon={<FontAwesomeIcon icon={faRightFromBracket} />}
              className="btn btn-light text-secondary border border-1"
            >
              Logout
            </Button>
          </div>
          <div>
          <h2>Welcome to dashboard</h2>
          </div>
        </Container>
      </div>
    </>
  );
}

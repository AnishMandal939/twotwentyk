import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthConfig } from "utils/useAuthConfig";
import "../Main.css";

export default function LandingSection() {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const { setToken } = useAuthConfig();
  const navigate = useNavigate();

  function login() {
    async function auth0Login() {
      try {
        await loginWithRedirect({});
        const token = await getAccessTokenSilently();
        setToken(token);
        Cookies.set("token", token);
      } catch (err) {
        console.error("Authentication error:", err);
      }
    }
    auth0Login();
  }

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/myhub");
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <>
        <Row className="align-items-center landing-section">
          <Col md={6} sm={12}>
            <h1>Please Login</h1>
            <p style={{width: '90%'}}>
            Join our community of professionals and gain access to premium products, personalized service, and special offers.<br /><br />
            Ready to get started? Open your trade account today or log in if you're already a member
            </p>
            <Row className="mt-3">
              
              <Col>
                {!isAuthenticated && (
                  <Button
                    onClick={() => login()}
                    variant="outline-activeprimary"
                    className="mb-3"
                  >
                    Login
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
          
        </Row>
    </>
  );
}

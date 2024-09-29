import { useAuth0 } from "@auth0/auth0-react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useMemo } from "react";
import { Button, Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setAppToken } from "redux/action/token/tokenAction";

export default function Homepage() {
  const { isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.appToken?.token);
  const config = useMemo(() => {
    if (!!token) {
      return {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return null;
  }, [token]);

  const handleLogout = () => {
    dispatch(setAppToken(""));
    window.sessionStorage.removeItem("user_role");
    localStorage.setItem("theme", "Light");
    logout({
      returnTo: window.location.origin,
      federated: true,
    });
  };

  const { data: twotwentyKData } = useQuery({
    queryKey: ["twotwentyKData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}category/nft_card_category/param?limit=10&offset=0`,
          config
        );
        return response?.data;
      } catch (error) {
        console.log(error);
        throw error; // Ensure the error is propagated
      }
    },
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });

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
            {twotwentyKData && (
              <>
                <div className="row">
                  {twotwentyKData?.data?.map((data, index) => (
                    <div className="col-4 py-1" key={index}>
                      <div className="card">
                        <div className="card-header">{data?.name}</div>
                        <div className="card-body">
                          <ul>
                            {data?.properties?.map((property, index) => (
                              <li key={index}>
                                {property?.title}: {property?.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {userInfo ? (
            <>
              <h1 className="text-center mb-4">会員限定情報です！</h1>
            </>
          ) : (
            <>
              <h1 className="text-center mb-4">まだ見れません</h1>
            </>
          )}
          <p className="text-center mb-4">
            {userInfo ? (
              <>ようこそ</>
            ) : (
              <>会員限定の情報を見たいならアカウントを開設しないといけない</>
            )}
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                サインイン
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary" href="/register" className="me-3">
                いますぐ始める
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;

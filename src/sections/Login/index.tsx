import React, { useRef, useEffect } from "react";
import { Card, Layout, Typography, Spin } from "antd";
import googleLogo from "./assets/google_logo.jpg";
import { Viewer } from "../../lib/types";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Redirect, useLocation } from "react-router-dom";
import { ErrorBanner } from "../../lib/components";
import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../lib/utils";

import { LOG_IN } from "../../lib/graphql/mutations";
import { AUTH_URL } from "../../lib/graphql/queries";
import {
  LogIn as LogInData,
  LogInVariables,
} from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import { useScrollToTop } from "../../lib/hooks/useScrollToTop";



const { Content } = Layout;
const { Text, Title } = Typography;



interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const Login = ({ setViewer }: Props) => {
  const client = useApolloClient();
  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError },
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn);
        sessionStorage.setItem("token", data.logIn.token);
        displaySuccessNotification("You've successfully logged in!");
      }
    },
  });
  const logInRef = useRef(logIn);

  const location = useLocation()
  useScrollToTop();

  useEffect(() => {
    // const code = new URL(window.location.href).searchParams.get("code"); // BEFORE
    const searchParams = new URLSearchParams(location.search) // AFTER -for testing purpose
    const code = searchParams.get("code")
    if (code) {
      logInRef.current({
        variables: {
          input: { code },
        },
      });
    }
  }, [location.search]);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });
      if (!data) {
        throw new Error("Unable to authenticate")
      }

      //window.location.href = data.authUrl; // BEFORE
      // http://localhost:3000/login?code=4%2F4gH7A94gVv2guhqOY5lyvUu9rRrP52BqyN1EMVMr4D85QfHjSRi5PoCKZZrVjLc9hWAgZwGw5PkDLrsm2_U7eto&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=0&prompt=consent#
      window.location.assign(data.authUrl) // AFTER -for testing purpose
    } catch {
      displayErrorMessage(
        "Sorry! We weren't able to log you in. Please try again later!"
      );
    }
  };
  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }
  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!" />
  ) : null;

  return (
    <Content className="log-in">
      {logInErrorBannerElement}
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to the APPLICATION!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button
          className="log-in-card__google-button"
          onClick={handleAuthorize}
        >
          <img
            src={googleLogo}
            alt="Google Logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">
            Sign in with Google
          </span>
        </button>
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form
          to sign in with your Google account.
        </Text>
      </Card>
    </Content>
  );
};

import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { alertContext } from "../src/context/ColorModeContext";

const Account = ({ user }) => {
  const { toggleLoading } = useContext(alertContext);

  useEffect(() => {
    toggleLoading(false);
  }, []);

  return <div>Hi {user.name}</div>;
};

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  if (!user) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return {
    props: { user },
  };
}

export default Account;

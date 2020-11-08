import Link from "next/link";
import { useQuery } from "urql";

const currentUserQuery = `
  query {
    currentUser {
      id
      email
    }
  }
`;

function Nav() {
  const [{ data }] = useQuery({
    query: currentUserQuery,
  });

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <nav>
      {data?.currentUser && <p>Logged in as {data.currentUser.email}</p>}
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>

        <li>
          <Link href="/search">
            <a>Search</a>
          </Link>
        </li>

        <li>
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        </li>

        {data?.currentUser && (
          <li>
            <button onClick={handleLogout}>log out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;

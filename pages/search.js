import Head from "next/head";
import { useQuery } from "urql";
import Nav from "../components/nav";

const profilesQuery = `
  query {
    profiles {
      id
      description
      slug
    }
  }
`;

function SearchPage() {
  const [{ data, fetching, error }] = useQuery({
    query: profilesQuery,
    requestPolicy: "cache-first",
  });

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>

      <Nav />

      <main>
        <h1>Search</h1>

        {fetching ? (
          <p>loading...</p>
        ) : error ? (
          <p>error</p>
        ) : (
          <ul>
            {data?.profiles.map((profile) => (
              <li key={profile.id}>{profile.slug}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export default SearchPage;

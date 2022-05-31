import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    // fetch data, once only ("https//pokeapi.co/api/v2/pokemon?limit=10")
    async function getPokemon() {
      const resp = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
      );
      setPokemon(await resp.json());
    }
    getPokemon();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((pm) => (
          <div className={styles.card} key={pm.id}>
            <Link href={`/pokemon/${pm.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pm.image}`}
                  alt={pm.name}
                />
              </a>
            </Link>
            <h3>{pm.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

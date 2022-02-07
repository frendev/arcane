import React from "react";
import styles from "../../styles/Services.module.scss";
import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "service",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "service",
    "fields.slug": params.slug,
  });

  return {
    props: { service: items[0] },
  };
};

const serviceDetails = ({ service }) => {
  console.log(service);

  const { description, title, slug, imageUrl } = service.fields;
  return (
    <div className={styles.servicesContainer}>
      <Head>
        <title>Arcane | Services</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.servicesMenuContainer}>
        <select className={styles.servicesMenu}>
          <option className={styles.servicesOption} value="0">
            Select a Service
          </option>
          <option className={styles.servicesOption} value="1">
            Railways and Metros
          </option>
          <option className={styles.servicesOption} value="2">
            Environment
          </option>
          <option className={styles.servicesOption} value="3">
            Highways & Roads
          </option>
        </select>
      </div>

      <div className={styles.servicesHeading}>Services - {title}</div>
      <div className={styles.servicesTabsContainer}>
        <div>Our Services</div>
        <ul className={styles.serviceTabs}>
          <li className={styles.serviceTab}>
            <span>Environment & Urban Development</span>
          </li>
          <li className={styles.serviceTab}>
            <span> Highways & Roads</span>
          </li>
          <li className={styles.serviceTab}>
            <span> Railways & Metros</span>
          </li>
        </ul>
      </div>
      <div className={styles.servicesDetails}>
        {documentToReactComponents(description)}
      </div>
    </div>
  );
};

export default serviceDetails;

import type { NextPage, GetStaticProps } from "next";
import { useState, useEffect, SetStateAction } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import working from "../public/images/illustration-working.svg";
import facebook from "../public/images/icon-facebook.svg";
import instagram from "../public/images/icon-instagram.svg";
import twitter from "../public/images/icon-twitter.svg";
import pintrest from "../public/images/icon-pinterest.svg";

interface Url {
  originalLink: string;
  shortLink: string;
}

const Home: NextPage = (props) => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<Url[]>([]);
  const [copied, setCopied] = useState<Number | null>(null);
  const [storage, setStorage] = useState({});

  useEffect(() => {
    if (window) {
      const data = window.localStorage.getItem("links");
    }
  }, []);

  const handleInput = (e: any): void => {
    setUrl(e.target.value);
  };

  const handleSubmit = (): void => {
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}/very/long/link.html`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setShortUrl([
          ...shortUrl,
          {
            originalLink: url,
            shortLink: data.result.full_short_link,
          },
        ]);
        sessionStorage.setItem(`${url}`, `${data.result.full_short_link}`);
      });
    setUrl("");
  };

  useEffect(() => {
    if (window) {
      const storage = window.sessionStorage;
      if (storage.length >= 1) {
        const str = Object.keys(storage).map((k) => {
          return {
            originalLink: k,
            shortLink: storage[k],
          };
        });
        setShortUrl([...str]);
      }
    }
  }, [url]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Link Shorter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <nav className={styles.navbar}>
          <div className={styles.left}>
            <h1 className={styles.logo}>Shortly</h1>
            <div className={styles.navlinks}>
              <a className={styles.link}>Features</a>
              <a className={styles.link}>Pricing</a>
              <a className={styles.link}>Resources</a>
            </div>
          </div>
        </nav>
        <section className={styles.hero}>
          <div className={styles.main}>
            <div className={styles.leftside}>
              <h1>More than just shorter links</h1>
              <p>
                Build your brand’s recognition and get detailed insights on how
                your links are performing.
              </p>
              <button>Get Started</button>
            </div>
            <div className={styles.rightside}>
              <Image width="500px" height="400px" src={working} alt="hero" />
            </div>
          </div>

          <div className={styles.linkinput}>
            <input
              type="text"
              placeholder="Shorten a link here..."
              required
              value={url}
              onChange={handleInput}
            />

            <button onClick={() => handleSubmit()}>Shorten It!</button>
          </div>
        </section>
        <section className={styles.shortlinks}>
          {shortUrl &&
            shortUrl.map((link, idx) => {
              return (
                <div key={link.shortLink} className={styles.shortlink}>
                  <p>{link.originalLink}</p>
                  <div className={styles.rightside}>
                    <a href={link.shortLink}>{link.shortLink}</a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(link.shortLink);
                        setCopied(idx);
                      }}
                      className={copied === idx ? styles.copied : styles.copy}
                    >
                      {copied === idx ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              );
            })}
        </section>
        <section className={styles.cardsection}>
          <div className={styles.cardsectitle}>
            <h1>Advanced Statistics</h1>
            <p>
              {" "}
              Track how your links are performing across the web with our
              advanced statistics dashboard.
            </p>
          </div>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h1> Brand Recognition</h1>
              <p>
                {" "}
                Boost your brand recognition with each click. Generic links
                don’t mean a thing. Branded links help instil confidence in your
                content.
              </p>
            </div>
            <div className={styles.card}>
              <h1>Detailed Records</h1>
              <p>
                Gain insights into who is clicking your links. Knowing when and
                where people engage with your content helps inform better
                decisions.
              </p>
            </div>
            <div className={styles.card}>
              <h1>Fully Customizable</h1>
              <p>
                {" "}
                Improve brand awareness and content discoverability through
                customizable links, supercharging audience engagement.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.calltoaction}>
          <h2 className={styles.title}>Boost your links today</h2>
          <button className={styles.started}>Get Started</button>
        </section>
        <footer className={styles.footerwrapper}>
          <div className={styles.footer}>
            <h3 className={styles.logo}>Shortly</h3>
            <div className={styles.links}>
              <h4>Features</h4> <a href="#">Link Shortening</a>{" "}
              <a href="#">Branded Links</a> <a href="#">Analytics</a>{" "}
            </div>
            <div className={styles.links}>
              <h4>Resources</h4> <a href="#">Blog</a>{" "}
              <a href="#"> Developers</a> <a href="#"> Support</a>{" "}
            </div>
            <div className={styles.links}>
              <h4>Company</h4> <a href="#">About</a> <a href="#">Our Team</a>{" "}
              <a href="#">Careers</a> <a href="#">Contact</a>{" "}
            </div>
            <div className={styles.icons}>
              <div>
                {" "}
                <Image width="24px" height="24px" src={facebook} alt="hero" />
              </div>

              <div>
                {" "}
                <Image width="24px" height="24px" src={twitter} alt="hero" />
              </div>
              <div>
                {" "}
                <Image width="24px" height="24px" src={pintrest} alt="hero" />
              </div>
              <div>
                {" "}
                <Image width="24px" height="24px" src={instagram} alt="hero" />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      exapmle: "example",
    },
  };
};

import { Html, Head, Main, NextScript } from 'next/document'
import { Global, css } from "@emotion/react";

export default function Document() {
  return (
    <Html lang="en">

<Global
        styles={css`
        :root {
          --gris: #3d3d3d;
          --gris2: #6F6F6F;
          --naranja: #DA552F;
          --gris3: #e1e1e1;
        }


        html {
          font-size: 62.5%;
          box-sizing: border-box;
        }

        *,*:before, *:after {
          box-sizing: inherit;
        }

        body {
          font-size:1.6rem;
          line-height: 1.5;
          font-family: 'PT Sans', sans-serif;

        }

        h1,h2,h3 {
          margin: 0 0 2rem 0
          line-height: 1.5;
        }

        ul {
          list-style: none;
          margin:0;
          padding:0;
        }

        a{
          text-decoration:none;
        }

        h1, h2 {
          font-family: 'Roboto Slab', serif;
          font-weight: 700;
        }

        h3 {
          font-family: 'PT Sans', sans-serif;
        
        }

        img {
          max-width:100%;
        }
    
    `}
      />
      <Head>
      <title>Product Hunt</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
          integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;1,700&family=Roboto+Slab:wght@100;400;700&display=swap"
          rel="stylesheet"
        />

        <link href="/static/css/app.css" rel="stylesheet" />
         </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

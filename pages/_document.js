import Document, { Head, Html, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render() {
        return(
            <Html lang="en">
                <Head>
                   <link 
                    rel="preload"
                    href='/fonts/BebasNeue-Regular.ttf'
                    as="font"
                    type='font/ttf'
                    crossOrigin="true"
                   />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;
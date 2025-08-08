import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <head>
                <meta name='description' content='My awesome description.' />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/icon?family=Material+Icons'
                />
            </head>
            <body>{children}</body>
        </html>
    );
}

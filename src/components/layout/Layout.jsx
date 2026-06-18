import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingCvButton from '../FloatingCvButton';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <Footer />
            <FloatingCvButton />
        </div>
    );
};

export default Layout;

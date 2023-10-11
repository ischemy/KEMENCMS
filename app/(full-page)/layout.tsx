import { Metadata } from 'next';
import AppConfig from '../../layout/AppConfig';
import React from 'react';

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'SIKDA',
    description: 'SIKDA (Sistem Informasi Puskesmas) adalah sebuah aplikasi yang dirancang untuk membantu staf dan tenaga medis Puskesmas dalam mengelola data pasien, jadwal kunjungan, inventaris obat, serta keperluan administrasi lainnya.'
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
    return (
        <React.Fragment>
            {children}
            <AppConfig simple />
        </React.Fragment>
    );
}

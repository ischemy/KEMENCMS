import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'SIKDA',
    description: 'SIKDA (Sistem Informasi Puskesmas) adalah sebuah aplikasi yang dirancang untuk membantu staf dan tenaga medis Puskesmas dalam mengelola data pasien, jadwal kunjungan, inventaris obat, serta keperluan administrasi lainnya.',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'SIKDA',
        url: 'https://sikda.kemkes.go.id/',
        description: 'SIKDA (Sistem Informasi Puskesmas) adalah sebuah aplikasi yang dirancang untuk membantu staf dan tenaga medis Puskesmas dalam mengelola data pasien, jadwal kunjungan, inventaris obat, serta keperluan administrasi lainnya.',
        // images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}

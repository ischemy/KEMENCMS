/* eslint-disable react/jsx-no-undef */
'use client';
import React, { useState } from 'react';
// import Queue from './queue/page';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { useRouter } from 'next/navigation';
import { TabView, TabPanel } from 'primereact/tabview';
import Queue from '../queue/page';
import QueuePatient from '../patient-queue/page';
import Crud from '../../pages/crud/page';
// import QueuePatient from './patient-queue/page';
// import Crud from '../pages/crud/page';

const FormPasien = ({ children }: any) => {
    interface ConfirmContent {
        title: string;
        nik: string;
        nama: string;
        umur?: number;
        noAntrian?: number;
    }

    const router = useRouter();
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [confirmContent, setConfirmContent] = useState<ConfirmContent>();

    const listSearchType = [
        {
            display: 'NIK',
            code: 'NIK'
        },
        {
            display: 'Nama',
            code: 'NAMA'
        },
        {
            display: 'No Antrian',
            code: 'NO_ANTRIAN'
        }
    ];

    const onSearch = () => {
        setConfirmDialog(true);
        setConfirmContent({
            title: 'Data Pasien Ditemukan',
            nik: '31232020291021',
            nama: 'Joko Susilo'
        });
    };

    const hideDialogConfirm = () => {
        setConfirmDialog(false);
    };

    const handleDialogConfirm = () => {
        setConfirmDialog(false);
        router.push('/registration/encounter');
    };

    const confirmDialogFooter = (
        <>
            <Button label="Kembali" icon="pi pi-times" text onClick={hideDialogConfirm} />
            <Button label="Lanjutkan Ke Pendaftaran" icon="pi pi-check" text onClick={handleDialogConfirm} />
        </>
    );

    return (
        <div>
            <div className="flex flex-column md:align-items-start">
                <h5>Pendaftaran Pasien Baru</h5>
                <TabView style={{ borderRadius: '99px' }}>
                    <TabPanel style={{ borderRadius: '99px', border: '1px solid #3899FE' }} header="Umum"></TabPanel>
                    <TabPanel header="JAMKESDA"></TabPanel>
                    <TabPanel header="JKN BPJS"></TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default FormPasien;

'use client';
import React, { useState } from 'react';
import Queue from './queue/page';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { useRouter } from 'next/navigation';
import { TabView, TabPanel } from 'primereact/tabview';
import QueuePatient from './patient-queue/page';
import Crud from '../pages/crud/page';
import Link from 'next/link';
import QueuePCare from './pcare-queue/page';

const BPJSRegistrationPage = ({ children }: any) => {
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
                <h5>Pendaftaran</h5>

                <div className="mt-3">
                    <TabView>
                        <TabPanel header="Data Pasien">
                            <Queue />
                        </TabPanel>
                        <TabPanel header="Antrian Pasien">
                            <QueuePatient />
                        </TabPanel>
                        <TabPanel header="Antrian PCare BPJS">
                            <QueuePCare />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default BPJSRegistrationPage;

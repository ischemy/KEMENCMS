'use client';
import React, { useState } from 'react';
import Queue from './queue/page';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { useRouter } from 'next/navigation';

const RegistrationPage = ({ children }: any) => {
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
            {/* <div className="card">
                <h5>Pendaftaran</h5>
                <div className="grid p-fluid">
                    <div className="col-12 md:col-2">
                        <Dropdown
                            value={searchType}
                            onChange={(e) => {
                                setSearchType(e.target.value);
                            }}
                            options={listSearchType}
                            optionLabel="display"
                            optionValue="code"
                            placeholder="Jenis"
                        />
                    </div>
                    <div className="col-12 md:col-4">
                        <InputText
                            placeholder="Kata Kunci .. "
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            value={search}
                        />
                    </div>
                    <div className="col-12 md:col-1">
                        <Button rounded style={{ background: '#3899FE' }} label="Cari" onClick={onSearch} />
                    </div>
                </div>
            </div> */}
            <Dialog visible={confirmDialog} style={{ width: '450px' }} header={confirmContent ? confirmContent.title : 'Konfirmasi'} modal footer={confirmDialogFooter} onHide={hideDialogConfirm}>
                <div className="align-items-center justify-content-center">
                    {confirmContent && confirmContent.nama && (
                        <>
                            <table className="font-bold">
                                <tbody>
                                    <tr>
                                        <td>NIK</td>
                                        <td>:</td>
                                        <td>{confirmContent.nik}</td>
                                    </tr>
                                    <tr>
                                        <td>Nama</td>
                                        <td>:</td>
                                        <td>{confirmContent.nama}</td>
                                    </tr>
                                    <tr>
                                        <td>No Antrian</td>
                                        <td>:</td>
                                        <td>{confirmContent.noAntrian}</td>
                                    </tr>
                                    <tr>
                                        <td>Umur</td>
                                        <td>:</td>
                                        <td>{confirmContent.umur}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </Dialog>
            <Queue />
        </div>
    );
};

export default RegistrationPage;

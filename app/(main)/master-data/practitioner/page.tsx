/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Practitioner } from '../../../types/practitioner';
import { PractitionerService } from '../../../../service/PractitionerService';
import { ENUM } from '../../../enum/practitioner';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { SearchRegion } from '../../../types/region';
import { CountryService } from '../../../../demo/service/CountryService';
import { InputSwitch } from 'primereact/inputswitch';

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const PracticionerPage = () => {
    let emptyPractitioner: Practitioner = {
        nik: '',
        nama: '',
        tglLahir: '',
        jenisKelamin: {
            code: 'L',
            display: 'Laki-laki'
        },
        alamat: '',
        telp: '',
        domisiliWilayahId: '',
        isActive: true
    };

    const [practitioners, setPractitioners] = useState(null);
    const [practitionerDialog, setPractitionerDialog] = useState(false);
    const [deletePractitionerDialog, setDeletePractitionerDialog] = useState(false);
    const [deletePractitionersDialog, setDeletePractitionersDialog] = useState(false);
    const [practitioner, setPractitioner] = useState<Practitioner>(emptyPractitioner);
    const [selectedPractitioners, setSelectedPractitioners] = useState(null);
    const [ktpWilayah, setKTPWilayah] = useState(null);
    const [domisiliWilayah, setDomisiliWilayah] = useState(null);
    const [listRegion, setListRegion] = useState<SearchRegion[]>([]);
    const [autoFilteredValue, setAutoFilteredValue] = useState<SearchRegion[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isSameKTP, setIsSameKTP] = useState(false);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        PractitionerService.getAll().then((data) => {
            setPractitioners(data as any);
        });
        CountryService.getCountries().then((data) => setListRegion(data));
    }, []);

    const openNew = () => {
        setPractitioner(emptyPractitioner);
        setSubmitted(false);
        setPractitionerDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPractitionerDialog(false);
    };

    const hideDeletePractitionerDialog = () => {
        setDeletePractitionerDialog(false);
    };

    const hideDeletePractitionersDialog = () => {
        setDeletePractitionersDialog(false);
    };

    const searchWilayah = (event: AutoCompleteCompleteEvent) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValue([...listRegion]);
            } else {
                setAutoFilteredValue(
                    listRegion.filter((region) => {
                        return region.name.toLowerCase().startsWith(event.query.toLowerCase());
                    })
                );
            }
        }, 250);
    };

    const savePractitioner = () => {
        setSubmitted(true);

        if (practitioner.nama.trim()) {
            let _practitioners = [...(practitioners as any)];
            let _practitioner = { ...practitioner };
            if (practitioner.id) {
                const index = findIndexById(practitioner.id);

                _practitioners[index] = _practitioner;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Practitioner Updated',
                    life: 3000
                });
            } else {
                _practitioner.id = createId();
                _practitioners.push(_practitioner);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Practitioner Created',
                    life: 3000
                });
            }

            setPractitioners(_practitioners as any);
            setPractitionerDialog(false);
            setPractitioner(emptyPractitioner);
        }
    };

    const editPractitioner = (practitioner: Practitioner) => {
        setPractitioner({ ...practitioner });
        setPractitionerDialog(true);
    };

    const confirmDeletePractitioner = (practitioner: Practitioner) => {
        setPractitioner(practitioner);
        setDeletePractitionerDialog(true);
    };

    const onStatusChange = (e: RadioButtonChangeEvent) => {
        let _practitioner = { ...practitioner };
        _practitioner.jenisKelamin = e.value;
        setPractitioner(_practitioner);
    };

    const onSameKTP = (value: boolean) => {
        if (value) {
            setDomisiliWilayah(ktpWilayah);
        } else {
            setDomisiliWilayah(null);
        }
        setIsSameKTP(value);
    };

    const setIsActive = (value: boolean) => {
        let _practitioner = { ...practitioner };
        _practitioner.isActive = value;
        setPractitioner(_practitioner);
    };

    const deletePractitioner = () => {
        let _practitioners = (practitioners as any)?.filter((val: any) => val.id !== practitioner.id);
        setPractitioners(_practitioners);
        setDeletePractitionerDialog(false);
        setPractitioner(emptyPractitioner);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Practitioner Deleted',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (practitioners as any)?.length; i++) {
            if ((practitioners as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePractitionersDialog(true);
    };

    const deleteSelectedPractitioners = () => {
        let _practitioners = (practitioners as any)?.filter((val: any) => !(selectedPractitioners as any)?.includes(val));
        setPractitioners(_practitioners);
        setDeletePractitionersDialog(false);
        setSelectedPractitioners(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Practitioners Deleted',
            life: 3000
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _practitioner = { ...practitioner };

        setPractitioner(_practitioner);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Tambah" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Hapus" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPractitioners || !(selectedPractitioners as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData: Practitioner) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editPractitioner(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeletePractitioner(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Kelola SDM/Nakes</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const practitionerDialogFooter = (
        <>
            <Button label="Batal" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Simpan" icon="pi pi-check" text onClick={savePractitioner} />
        </>
    );
    const deletePractitionerDialogFooter = (
        <>
            <Button label="Tidak" icon="pi pi-times" text onClick={hideDeletePractitionerDialog} />
            <Button label="Iya" icon="pi pi-check" text onClick={deletePractitioner} />
        </>
    );
    const deletePractitionersDialogFooter = (
        <>
            <Button label="Tidak" icon="pi pi-times" text onClick={hideDeletePractitionersDialog} />
            <Button label="Iya" icon="pi pi-check" text onClick={deleteSelectedPractitioners} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={practitioners}
                        selection={selectedPractitioners}
                        onSelectionChange={(e) => setSelectedPractitioners(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} Data"
                        globalFilter={globalFilter}
                        emptyMessage="Tidak ada data"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="name" header="Nama" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="role" header="Jenis" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={practitionerDialog} header="Detail Data" modal className="p-fluid" footer={practitionerDialogFooter} onHide={hideDialog}>
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="nik">NIK</label>
                                    <InputText
                                        id="nik"
                                        value={practitioner.nik}
                                        onChange={(e) => onInputChange(e, 'nik')}
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !practitioner.nik
                                        })}
                                    />
                                    {submitted && !practitioner.nik && <small className="p-invalid">Kode is required.</small>}
                                </div>
                                <div className="field">
                                    <label htmlFor="satusehatId">ID SATUSEHAT</label>
                                    <InputText
                                        id="satusehatId"
                                        value={practitioner.satusehatId}
                                        onChange={(e) => onInputChange(e, 'satusehatId')}
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !practitioner.satusehatId
                                        })}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="sisdmkId">ID SISDMK</label>
                                    <InputText
                                        id="sisdmkId"
                                        value={practitioner.sisdmkId}
                                        onChange={(e) => onInputChange(e, 'sisdmkId')}
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !practitioner.sisdmkId
                                        })}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="nama">Nama</label>
                                    <InputText
                                        id="nama"
                                        value={practitioner.nama}
                                        onChange={(e) => onInputChange(e, 'nama')}
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !practitioner.nama
                                        })}
                                    />
                                    {submitted && !practitioner.nama && <small className="p-invalid">Name is required.</small>}
                                </div>
                                <div className="field">
                                    <label htmlFor="name">Status</label>
                                    <div className="formgrid grid">
                                        {ENUM.GENDER.map((item, index) => {
                                            return (
                                                <div className="field-radiobutton col-4" key={index}>
                                                    <RadioButton inputId={item.code} name="status" value={item} onChange={onStatusChange} checked={practitioner.jenisKelamin === item} />
                                                    <label htmlFor={item.code}>{item.display}</label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="field">
                                    <label htmlFor="tglLahir">Tgl Lahir</label>
                                    <Calendar showIcon showButtonBar value={practitioner.tglLahir} onChange={(e) => (practitioner.tglLahir = e.value ?? null)} />
                                </div>
                                <div className="field">
                                    <label htmlFor="telp">Telp</label>
                                    <InputText
                                        id="telp"
                                        value={practitioner.telp}
                                        onChange={(e) => onInputChange(e, 'telp')}
                                        required
                                        autoFocus
                                        className={classNames({
                                            'p-invalid': submitted && !practitioner.nama
                                        })}
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="ktpWilayah">Alamat KTP</label>
                                    <AutoComplete placeholder="Cari Alamat KTP" id="ktpWilayah" dropdown value={ktpWilayah} onChange={(e) => setKTPWilayah(e.value)} suggestions={autoFilteredValue} completeMethod={searchWilayah} field="name" />
                                </div>
                                <div className="field">
                                    <label htmlFor="isSameKTP">Alamat Domisili Sama Dengan KTP ?</label> <br />
                                    <InputSwitch id="isSameKTP" checked={isSameKTP} onChange={(e) => onSameKTP(e.value ?? false)} />
                                </div>
                                <div className="field">
                                    <label htmlFor="domisiliWilayahId">Alamat Domisili</label>
                                    <AutoComplete
                                        placeholder="Cari Alamat Domisi"
                                        id="domisiliWilayahId"
                                        dropdown
                                        value={domisiliWilayah}
                                        onChange={(e) => setDomisiliWilayah(e.value)}
                                        suggestions={autoFilteredValue}
                                        completeMethod={searchWilayah}
                                        field="name"
                                    />
                                </div>
                                <div className="field">
                                    <label htmlFor="isActive">Aktif</label>
                                    <br />
                                    <InputSwitch id="isActive" checked={practitioner.isActive} onChange={(e) => setIsActive(e.value ?? false)} />
                                </div>
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deletePractitionerDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePractitionerDialogFooter} onHide={hideDeletePractitionerDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {practitioner && (
                                <span>
                                    Apakah anda yakin ingin menghapus <b>{practitioner.nama}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deletePractitionersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePractitionersDialogFooter} onHide={hideDeletePractitionersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {practitioner && <span>Apakah anda yakin ingin menghapus semua item yang dipilih?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default PracticionerPage;

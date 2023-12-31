'use client';
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProductService } from '../../../../demo/service/ProductService';
import Link from 'next/link';

const Queue = ({ children }: any) => {
    const dt = useRef<DataTable<any>>(null);
    const [queues, setQueues] = useState(null);
    const [product, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [editDialog, setEditDialog] = useState(false);
    const [detailDialog, setDetailDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState();

    const listSearchType = [
        {
            display: 'No.Antrian',
            code: 'NoAntrian'
        },
        {
            display: 'Nama',
            code: 'NAMA_PASIEN'
        },
        {
            display: 'KK',
            code: 'KK'
        }
    ];
    const header = (
        <>
            <div className="flex justify-content-between">
                <div className="flex flex-column md:align-items-start">
                    <div className="flex md:justify-content-between">
                        <div className="col-12 md:col-2">
                            <h6>Pencarian Berdasarkan</h6>
                            <Dropdown
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value);
                                }}
                                style={{ borderRadius: '99px', width: '200px' }}
                                options={listSearchType}
                                optionLabel="display"
                                optionValue="code"
                                placeholder="Nama organisasi/faskes"
                            />
                        </div>
                        <div className="col-12 md:col-5 mt-5">
                            <span className="p-input-icon-left flex">
                                <i className="pi pi-search" />
                                <InputText
                                    style={{ borderRadius: '99px', width: '620px' }}
                                    className="inputtext"
                                    placeholder="Cari Nama Pasien "
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    value={search}
                                />
                            </span>
                        </div>
                        <div className="col-12 md:col-1 mt-5">
                            <Button style={{ background: '#3899FE', border: 'none', width: '80px' }} label="Cari" />
                        </div>
                        <div className="col-12 md:col-2">
                            <h6>TIPE</h6>
                            <Dropdown
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value);
                                }}
                                style={{ borderRadius: '99px', width: '200px' }}
                                options={listSearchType}
                                optionLabel="display"
                                optionValue="code"
                                placeholder="Nama pasien"
                            />
                        </div>
                        <div className="col-12 md:col-2">
                            <h6>STATUS</h6>
                            <Dropdown
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value);
                                }}
                                style={{ borderRadius: '99px', width: '200px' }}
                                options={listSearchType}
                                optionLabel="display"
                                optionValue="code"
                                placeholder="Jenis"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const detailModal = (queue: any) => {
        setQueues({ ...queue });
        setDetailDialog(true);
    };

    const editModal = (queue: any) => {
        setQueues({ ...queue });
        setEditDialog(true);
    };

    const confirmDelete = (queue: any) => {
        setQueues(queue);
        setDeleteDialog(true);
    };
    const actionBodyTemplate = (rowData: Location) => {
        return (
            <>
                <Button icon="pi-info-circle" severity="info" className="mr-2 " onClick={() => detailModal(rowData)} />
                <Button icon="pi pi-pencil" severity="success" className="mr-2 " onClick={() => editModal(rowData)} />
                <Button icon="pi pi-trash" severity="danger" onClick={() => confirmDelete(rowData)} />
            </>
        );
    };
    // useEffect(() => {
    //     ProductService.getProductsSmall().then((response) => setProducts(response));
    // }, []);
    return (
        <div className="grid ">
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <Button label="Cetak Laporan Poli" className="mr-4" outlined />
                            <Button label="Cetak Laporan Diagnosa" outlined />
                        </div>
                        <div>
                            <Link href={'/registration/formPasien'}>
                                <i className="pi pi-fw pi-plus mr-1" style={{ color: '#3899FE' }}></i>
                                Pendaftaran Baru
                            </Link>
                        </div>
                    </div>
                    <DataTable
                        ref={dt}
                        value={product}
                        dataKey="name"
                        paginator
                        rows={5}
                        // rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} Data"
                        globalFilter={globalFilter}
                        emptyMessage="Tidak ada data"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="nomor" header="NO" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="kode" header="KODE" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nama" header="NAMA" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="tipe" header="TIPE" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="status" header="STATUS" sortable headerStyle={{ minWidth: '15rem' }}></Column>

                        <Column header="Aksi" body={actionBodyTemplate} headerStyle={{ minWidth: '20rem' }}></Column>
                    </DataTable>
                    <p></p>
                </div>
            </div>
        </div>
    );
};

export default Queue;

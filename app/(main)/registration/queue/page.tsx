'use client';
import React, { useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const Queue = ({ children }: any) => {
    const dt = useRef<DataTable<any>>(null);
    const [queues, setQueues] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [editDialog, setEditDialog] = useState(false);
    const [detailDialog, setDetailDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState();

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
    const header = (
        <div className="flex flex-column md:align-items-start">
            <h5>Pendaftaran Umum</h5>
            <div className="flex md:justify-content-between">
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
                    <Button rounded style={{ background: '#3899FE' }} label="Cari" />
                </div>
            </div>
        </div>
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
                <Button icon="pi pi-bars" rounded severity="info" className="mr-2" onClick={() => detailModal(rowData)} />
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editModal(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDelete(rowData)} />
            </>
        );
    };
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <DataTable
                        ref={dt}
                        value={queues}
                        dataKey="name"
                        // paginator
                        rows={10}
                        // rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        // currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} Data"
                        globalFilter={globalFilter}
                        emptyMessage="Tidak ada data"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="no_antrian" header="No Antrian" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="rm" header="RM" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nik" header="NIK" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="name" header="Nama" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="umur" header="Umur" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Aksi" body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                    <p>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Queue;

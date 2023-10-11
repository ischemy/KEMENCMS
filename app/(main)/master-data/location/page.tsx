/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { TabMenu } from 'primereact/tabmenu';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { LocationService } from '../../../../service/LocationService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Location } from '../../../types/location';
import { Coding, Identifier } from '../../../types/global';
import DetailPage from './detail';
import ListPage from './list';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { ENUM } from '../../../enum/location';
import { InputTextarea } from 'primereact/inputtextarea';

const LocationPage = () => {
    let emptyLocation: Location = {
        status: 'active',
        physicalType: {
            code: '',
            display: ''
        },
        name: '',
        identifier: [
            {
                use: 'official',
                value: ''
            }
        ],
        mode: 'instance'
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const [locations, setLocations] = useState(null);
    const [locationDialog, setEditDialog] = useState(false);
    const [detailDialog, setDetailDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteSelectedDialog, setDeleteSelectedDialog] = useState(false);
    const [location, setLocation] = useState<Location>(emptyLocation);
    const [selectedLocations, setSelectedLocations] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const listPhysicalType: Coding[] = ENUM.PHYSICAL_TYPE;
    const listOperasional: Coding[] = ENUM.OPERATIONAL_STATUS;
    const listOrganization = [
        {
            id: '79f88d5d-deb3-4b88-bfc1-2e6d39a37ef1',
            name: 'Puskesmas Kebayoran Baru'
        },
        {
            id: '511ec8dd-5945-4228-9487-ab2d28b48453',
            name: 'Rawat Jalan Terpadu'
        }
    ];

    const listProvince = [
        {
            code: '31',
            name: 'DKI Jakarta'
        },
        {
            code: '32',
            name: 'Jawa Barat'
        }
    ];

    const listCity = [
        {
            code: '3171',
            name: 'Jakarta Pusat'
        },
        {
            code: '3172',
            name: 'Jakarta Selatan'
        }
    ];

    const listDistrict = [
        {
            code: '3171010',
            name: 'Kebayoran Baru'
        },
        {
            code: '3171011',
            name: 'Mampang Prapatan'
        }
    ];

    const listVillage = [
        {
            code: '31710101',
            name: 'Jati Asih'
        },
        {
            code: '31710102',
            name: 'Menteng'
        }
    ];

    const tabItems = [{ label: 'Detail' }, { label: 'Organisasi' }];

    useEffect(() => {
        LocationService.getAll().then((data) => {
            setLocations(data as any);
        });
    }, []);

    const openNew = () => {
        setLocation(emptyLocation);
        setSubmitted(false);
        setEditDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setEditDialog(false);
    };
    const hideDetailDialog = () => {
        setSubmitted(false);
        setDetailDialog(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const hideDeleteSelectedDialog = () => {
        setDeleteSelectedDialog(false);
    };

    const save = () => {
        setSubmitted(true);

        if (location.name.trim()) {
            let _locations = [...(locations as any)];
            let _location = { ...location };
            if (location.id) {
                const index = findIndexById(location.id);

                _locations[index] = _location;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Location Updated',
                    life: 3000
                });
            } else {
                _location.id = createId();
                _locations.push(_location);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Location Created',
                    life: 3000
                });
            }

            setLocations(_locations as any);
            setEditDialog(false);
            setLocation(emptyLocation);
        }
    };

    const detailModal = (location: Location) => {
        setLocation({ ...location });
        setDetailDialog(true);
    };

    const editModal = (location: Location) => {
        setLocation({ ...location });
        setEditDialog(true);
    };

    const confirmDelete = (location: Location) => {
        setLocation(location);
        setDeleteDialog(true);
    };

    const handleDelete = () => {
        let _locations = (locations as any)?.filter((val: any) => val.id !== location.id);
        setLocations(_locations);
        setDeleteDialog(false);
        setLocation(emptyLocation);
        toast.current?.show({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Organisasi berhasil di hapus',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (locations as any)?.length; i++) {
            if ((locations as any)[i].id === id) {
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
        setDeleteSelectedDialog(true);
    };

    const deleteSelected = () => {
        let _locations = (locations as any)?.filter((val: any) => !(selectedLocations as any)?.includes(val));
        setLocations(_locations);
        setDeleteSelectedDialog(false);
        setSelectedLocations(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Organisasi berhasil di hapus',
            life: 3000
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _location = { ...location };

        switch (name) {
            case 'identifier':
                _location.identifier = [
                    {
                        use: 'official',
                        value: val
                    }
                ];
                break;
            case 'name':
                _location.name = val;
                break;
            case 'description':
                _location.description = val;
                break;
            case 'mode':
                _location.mode = val;
                break;
            case 'physicalType':
                console.log(val);
                _location.physicalType = {
                    code: val,
                    display: val
                };
        }

        setLocation(_location);
    };

    const onDropdownChange = (e: DropdownChangeEvent, name: string) => {
        let _location = { ...location };
        let val = e.value;
        // let display = e.label;
        switch (name) {
            case 'physicalType':
                _location.physicalType = {
                    code: val
                };
                break;
            case 'operationalStatus':
                _location.operationalStatus = {
                    code: val
                };
                break;
            case 'managingOrganization':
                _location.managingOrganization = val;
        }
        setLocation(_location);
    };

    const onStatusChange = (e: RadioButtonChangeEvent) => {
        let _location = { ...location };
        _location['status'] = e.value;
        setLocation(_location);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Tambah" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Hapus" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedLocations || !(selectedLocations as any).length} />
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

    const codeData = (rowData: Location) => {
        let result: Identifier = {
            use: 'official',
            value: ''
        };
        rowData.identifier?.map((type: Identifier) => {
            if (type.use === 'official') {
                result = type;
            }
        });

        return result;
    };

    const codeBodyTemplate = (rowData: Location) => {
        let code = codeData(rowData);
        return (
            <>
                <span className="p-column-title">Tipe</span>
                <span key={code.value}>{code.value}</span>
            </>
        );
    };

    const typeBodyTemplate = (rowData: Location) => {
        return <>{rowData?.operationalStatus?.display}</>;
    };

    const statusBodyTemplate = (rowData: Location) => {
        return <>{rowData.status}</>;
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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Kelola Lokasi</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const editDialogFooter = (
        <>
            <Button label="Batal" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Simpan" icon="pi pi-check" text onClick={save} />
        </>
    );

    const detailDialogFooter = (
        <>
            <Button label="Batal" icon="pi pi-times" text onClick={hideDetailDialog} />
        </>
    );
    const deleteDialogFooter = (
        <>
            <Button label="Tidak" icon="pi pi-times" text onClick={hideDeleteDialog} />
            <Button label="Iya" icon="pi pi-check" text onClick={handleDelete} />
        </>
    );
    const deleteSelectedDialogFooter = (
        <>
            <Button label="Tidak" icon="pi pi-times" text onClick={hideDeleteSelectedDialog} />
            <Button label="Iya" icon="pi pi-check" text onClick={deleteSelected} />
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
                        value={locations}
                        selection={selectedLocations}
                        onSelectionChange={(e) => setSelectedLocations(e.value as any)}
                        dataKey="name"
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
                        <Column field="code" header="Kode" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="name" header="Nama" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="tipe" header="Tipe" sortable body={typeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="statis" header="Status" sortable body={statusBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={locationDialog} header="Detail Data" modal className="p-fluid" footer={editDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Kode</label>
                            <InputText
                                id="code"
                                value={codeData(location).value}
                                onChange={(e) => onInputChange(e, 'identifier')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !location.name
                                })}
                            />
                            {submitted && !location.name && <small className="p-invalid">Kode is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Nama</label>
                            <InputText
                                id="name"
                                value={location.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !location.name
                                })}
                            />
                            {submitted && !location.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Deskripsi</label>
                            <InputTextarea id="description" value={location.description} onChange={(e) => onInputChange(e, 'description')} autoFocus />
                        </div>
                        <div className="field">
                            <label htmlFor="physicalType">Tipe</label>
                            <Dropdown onChange={(e) => onDropdownChange(e, 'physicalType')} value={location.physicalType.code} options={listPhysicalType} optionLabel="display" optionValue="code" placeholder="Pilih Tipe" />
                            {submitted && !location.physicalType && <small className="p-invalid">Tipe is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="operationalStatus">Status Operasional</label>
                            <Dropdown onChange={(e) => onDropdownChange(e, 'operationalStatus')} value={location.operationalStatus?.code} options={listOperasional} optionLabel="display" optionValue="code" placeholder="Pilih Status Operasional" />
                            {submitted && !location.operationalStatus && <small className="p-invalid">Tipe is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Status</label>
                            <div className="formgrid grid">
                                {ENUM.STATUS.map((item, index) => {
                                    return (
                                        <div className="field-radiobutton col-4" key={index}>
                                            <RadioButton inputId={item} name="status" value={item} onChange={onStatusChange} checked={location.status === item} />
                                            <label htmlFor={item}>{item}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="managingOrganization">Organisasi</label>
                            <Dropdown onChange={(e) => onDropdownChange(e, 'managingOrganization')} value={location.managingOrganization} options={listOrganization} optionLabel="name" optionValue="id" placeholder="Pilih Organisasi" />
                        </div>
                    </Dialog>

                    <Dialog visible={detailDialog} style={{ minWidth: '1024px' }} header="Detail Data" modal className="p-fluid" footer={detailDialogFooter} onHide={hideDetailDialog}>
                        <TabMenu model={tabItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                        <div className="m-4">
                            {activeIndex == 0 && <ListPage location={location} />}
                            {activeIndex == 1 && <DetailPage location={location} />}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {location && (
                                <span>
                                    Apakah anda yakin ingin menghapus <b>{location.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteSelectedDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSelectedDialogFooter} onHide={hideDeleteSelectedDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {location && <span>Apakah anda yakin ingin menghapus semua item yang dipilih?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default LocationPage;

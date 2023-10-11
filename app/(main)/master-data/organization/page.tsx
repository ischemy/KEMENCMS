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
import { OrganizationService } from '../../../../demo/service/OrganizationService';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { Organization } from '../../../types/organization';
import { Identifier, Telecom } from '../../../types/global';
import DetailPage from './detail';
import ListPage from './list';
import { ENUM, STATUS } from '../../../enum/organization';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';

const OrganizationPage = () => {
    let emptyOrganization: Organization = {
        active: false,
        type: {
            code: '',
            display: ''
        },
        name: ''
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const [organizations, setOrganizations] = useState(null);
    const [organizationDialog, setEditDialog] = useState(false);
    const [detailDialog, setDetailDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteSelectedDialog, setDeleteSelectedDialog] = useState(false);
    const [organization, setOrganization] = useState<Organization>(emptyOrganization);
    const [selectedOrganizations, setSelectedOrganizations] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [contact, setContact] = useState({ phone: '', email: '' });
    const [modalName, setModalName] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const tabItems = [{ label: 'Detail' }, { label: 'Organisasi' }];

    useEffect(() => {
        OrganizationService.getAll().then((data) => {
            setOrganizations(data as any);
        });
    }, []);

    const openNew = () => {
        setOrganization(emptyOrganization);
        setSubmitted(false);
        setModalName('Tambah');
        setContact({ phone: '', email: '' });
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

    const saveOrganization = () => {
        setSubmitted(true);

        if (organization.name.trim()) {
            let _organizations = [...(organizations as any)];
            let _organization = { ...organization };
            if (organization.id) {
                const index = findIndexById(organization.id);

                _organizations[index] = _organization;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Organization Updated',
                    life: 3000
                });
            } else {
                _organization.id = createId();
                _organizations.push(_organization);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Organization Created',
                    life: 3000
                });
            }

            setOrganizations(_organizations as any);
            setEditDialog(false);
            setOrganization(emptyOrganization);
        }
    };

    const detailModal = (organization: Organization) => {
        setOrganization({ ...organization });
        setDetailDialog(true);
    };

    const editModal = (organization: Organization) => {
        setOrganization({ ...organization });
        let _contact = {
            phone: '',
            email: ''
        };
        if (organization.telecom) {
            _contact.phone = findTelecom(organization.telecom, 'phone');
            _contact.email = findTelecom(organization.telecom, 'email');
            setContact(_contact);
        }
        setModalName('Edit');
        setEditDialog(true);
    };

    const confirmDelete = (organization: Organization) => {
        setOrganization(organization);
        setDeleteDialog(true);
    };

    const deleteOrganization = () => {
        let _organizations = (organizations as any)?.filter((val: any) => val.id !== organization.id);
        setOrganizations(_organizations);
        setDeleteDialog(false);
        setOrganization(emptyOrganization);
        toast.current?.show({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Organisasi berhasil di hapus',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (organizations as any)?.length; i++) {
            if ((organizations as any)[i].id === id) {
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
        let _organizations = (organizations as any)?.filter((val: any) => !(selectedOrganizations as any)?.includes(val));
        setOrganizations(_organizations);
        setDeleteSelectedDialog(false);
        setSelectedOrganizations(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Berhasil',
            detail: 'Organisasi berhasil di hapus',
            life: 3000
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _organization = { ...organization };
        switch (name) {
            case 'name':
                _organization.name = val;
                break;
            case 'identifier':
                _organization.identifier = [
                    {
                        use: 'official',
                        value: val
                    }
                ];
                break;
            case 'telp':
                contact.phone = val;
                break;
            case 'email':
                contact.email = val;
        }

        setOrganization(_organization);
    };

    const onStatusChange = (e: RadioButtonChangeEvent) => {
        let _organization = { ...organization };
        console.log(e.value);
        _organization['active'] = e.value;
        setOrganization(_organization);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Tambah" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Hapus" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedOrganizations || !(selectedOrganizations as any).length} />
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

    const codeData = (rowData: Organization) => {
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

    const codeBodyTemplate = (rowData: Organization) => {
        let code = codeData(rowData);
        return (
            <>
                <span className="p-column-title">Tipe</span>
                <span key={code.value}>{code.value}</span>
            </>
        );
    };

    const typeBodyTemplate = (rowData: Organization) => {
        return <>{rowData?.type?.display}</>;
    };

    const statusBodyTemplate = (rowData: Organization) => {
        return <>{rowData.active ? 'Aktif' : 'Tidak Aktif'}</>;
    };

    const findTelecom = (telecom: Telecom[], system: string) => {
        let result = '';
        telecom.map((type: Telecom) => {
            if (type.system === system) {
                result = type.value;
            }
        });

        return result;
    };

    const actionBodyTemplate = (rowData: Organization) => {
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
            <h5 className="m-0">Kelola Organisasi</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const editDialogFooter = (
        <>
            <Button label="Batal" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Simpan" icon="pi pi-check" text onClick={saveOrganization} />
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
            <Button label="Iya" icon="pi pi-check" text onClick={deleteOrganization} />
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
                        value={organizations}
                        selection={selectedOrganizations}
                        onSelectionChange={(e) => setSelectedOrganizations(e.value as any)}
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
                        <Column field="code" header="Kode" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="name" header="Nama" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="tipe" header="Tipe" sortable body={typeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="statis" header="Status" sortable body={statusBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={organizationDialog} header={`${modalName || 'Detail'} Data`} modal className="p-fluid" footer={editDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="identifier">Kode</label>
                            <InputText
                                id="identifier"
                                value={codeData(organization).value}
                                onChange={(e) => onInputChange(e, 'identifier')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && organization.identifier?.length == 0
                                })}
                            />
                            {submitted && !organization.identifier && <small className="p-invalid">Kode is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Nama</label>
                            <InputText
                                id="name"
                                value={organization.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !organization.name
                                })}
                            />
                            {submitted && !organization.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Status</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="status" name="status" value={true} onChange={onStatusChange} checked={organization.active === STATUS.ACTIVE} />
                                    <label htmlFor="status">Aktif</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="status" name="status" value={false} onChange={onStatusChange} checked={organization.active === STATUS.INACTIVE} />
                                    <label htmlFor="status">Tidak Aktif</label>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="">Telp</label>
                            <InputText
                                id="telp"
                                value={contact.phone}
                                onChange={(e) => onInputChange(e, 'telp')}
                                className={classNames({
                                    'p-invalid': submitted && !contact.phone
                                })}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="">Email</label>
                            <InputText
                                id="email"
                                value={contact.email}
                                onChange={(e) => onInputChange(e, 'email')}
                                className={classNames({
                                    'p-invalid': submitted && !contact.email
                                })}
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={detailDialog} style={{ minWidth: '1024px' }} header="Detail Data" modal className="p-fluid" footer={detailDialogFooter} onHide={hideDetailDialog}>
                        <TabMenu model={tabItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                        <div className="m-4">
                            {activeIndex == 0 && <ListPage organization={organization} />}
                            {activeIndex == 1 && <DetailPage organization={organization} />}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {organization && (
                                <span>
                                    Apakah anda yakin ingin menghapus <b>{organization.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteSelectedDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSelectedDialogFooter} onHide={hideDeleteSelectedDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {organization && <span>Apakah anda yakin ingin menghapus semua item yang dipilih?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default OrganizationPage;

'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import { Coding } from '../../../types/global';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Patient } from '../../../types/patient';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ENUM, NATIONALITY } from '../../../enum/identity';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { InputSwitch } from 'primereact/inputswitch';
import { SearchRegion } from '../../../types/region';

interface Encounter {
    date: Date | string;
    type: string;
    patientType?: TypePatient;
    payment?: string;
    polyclinic?: string;
    complaints?: string;
    physicalExamination: PhysicalExamination;
    bloodPressure: BloodyPreasure;
}

interface PhysicalExamination {
    height?: number;
    weight?: number;
    abdominalCircumference?: number;
    bloodPressure?: number;
    BMI?: number;
}

interface BloodyPreasure {
    systolic?: number;
    diastolic?: number;
    respiratoryRate?: number;
    hearthRate?: number;
}

interface TypePatient {
    display: string;
    code: string;
    payment: Coding[];
}
const KunjunganPage = ({ children }: any) => {
    const emptyEncounter: Encounter = {
        date: new Date(),
        type: 'KUNJUNGAN_SAKIT',
        payment: '',
        physicalExamination: {},
        bloodPressure: {}
    };
    const emptyPatient: Patient = {
        nik: 3321212101293202,
        name: '',
        birthDate: '',
        birthPlace: '',
        gender: '',
        nationality: NATIONALITY.WNI.code
    };
    const toast = useRef<Toast>(null);
    const [patient, setPatient] = useState<Patient>(emptyPatient);
    const [encounter, setEncounter] = useState<Encounter>(emptyEncounter);
    const [isAllowInputPatient, setIsAllowInputPatient] = useState(true);
    const [isShowDetailPatient, setIsShowDetailPatient] = useState(false);
    const [isSameKTP, setIsSameKTP] = useState(false);
    const [listRegion, setListRegion] = useState<SearchRegion[]>([]);
    const [autoFilteredValue, setAutoFilteredValue] = useState<SearchRegion[]>([]);
    const router = useRouter();
    const listPatientType = [
        {
            display: 'UMUM',
            code: 'UMUM',
            payment: [
                {
                    display: 'Tunai',
                    code: 'TUNAI'
                },
                {
                    display: 'Gratis',
                    code: 'GRATIS'
                }
            ]
        },
        {
            display: 'BPJS',
            code: 'BPJS',
            payment: [
                {
                    display: 'PBI',
                    code: 'PBI'
                },
                {
                    display: 'Non PBI',
                    code: 'NON_PBI'
                }
            ]
        },
        {
            display: 'JAMKESDA',
            code: 'JAMKESDA',
            payment: [
                {
                    display: 'JAMKESDA',
                    code: 'JAMKESDA'
                }
            ]
        }
    ];
    const listEncounterType: Coding[] = [
        {
            display: 'Kunjungan Sehat',
            code: 'KUNJUNGAN_SEHAT'
        },
        {
            display: 'Kunjungan Sakit',
            code: 'KUNJUNGAN_SAKIT'
        }
    ];

    const listPolyclinic: Coding[] = [
        {
            display: 'Umum',
            code: 'UMUM'
        },
        {
            display: 'Anak',
            code: 'ANAK'
        },
        {
            display: 'Penyakit Dalam',
            code: 'PENYAKIT_DALAM'
        }
    ];

    const calculateBMI = (height: number, weight: number, age: number, gender: string) => {
        let BMI = 0;

        // Menghitung berat badan ideal untuk pria
        if (gender === 'L') {
            BMI = height - 100 - ((height - 100) * 10) / 100;
        }
        // Menghitung berat badan ideal untuk wanita
        else if (gender === 'P') {
            BMI = height - 100 - ((height - 100) * 15) / 100;
        } else {
            return 0;
        }

        // Menghitung perbedaan antara berat badan aktual dengan berat badan ideal
        return weight - BMI;
    };

    const onPatientChange = (value: any, name: string) => {
        const _patient = { ...patient };
        switch (name) {
            case 'nik':
                _patient.nik = value;
                break;
            case 'name':
                _patient.name = value;
                break;
            case 'gender':
                _patient.gender = value;
                break;
            case 'birthDate':
                _patient.birthDate = value;
                break;
            case 'birthPlace':
                _patient.birthPlace = value;
                break;
            case 'ktpAddress':
                _patient.ktpAddress = value;
                break;
            case 'nationality':
                _patient.nationality = value;
                console.log(value);
                break;
        }
        setPatient(_patient);
    };

    const onValueChange = (value: any, name: string) => {
        const _encounter = { ...encounter };

        switch (name) {
            case 'patientType':
                _encounter.patientType = value;
                if (value.payment.length > 0) {
                    _encounter.payment = value.payment[0].code;
                }
                break;
            case 'payment':
                _encounter.payment = value;
                break;
            case 'type':
                _encounter.type = value;
                break;
            case 'polyclinic':
                _encounter.polyclinic = value;
                break;
            case 'complaints':
                _encounter.complaints = value;
                break;
            case 'height':
                _encounter.physicalExamination.height = value;
                break;
            case 'weight':
                _encounter.physicalExamination.weight = value;
                break;
            case 'abdominalCircumference':
                _encounter.physicalExamination.abdominalCircumference = value;
                break;
            case 'disatolic':
                _encounter.bloodPressure.diastolic = value;
                break;
            case 'systolic':
                _encounter.bloodPressure.systolic = value;
                break;
            case 'respiratoryRate':
                _encounter.bloodPressure.respiratoryRate = value;
                break;
            case 'hearthRate':
                _encounter.bloodPressure.hearthRate = value;
                break;
        }
        setEncounter(_encounter);
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

    const onSameKTP = (value: boolean) => {
        const _patient = { ...patient };
        if (value) {
            _patient.residenceAddress = _patient.ktpAddress;
        } else {
            _patient.residenceAddress = null;
        }
        setPatient(_patient);
        setIsSameKTP(value);
    };

    const showMessage = (severity: 'success' | 'info' | 'warn' | 'error' | undefined = 'success', summary: string = 'Berhasil', detail: string = '', life: number = 3000) => {
        toast.current?.show({
            severity,
            summary,
            detail,
            life
        });
    };

    const onSubmit = () => {
        router.push('/registration');
        showMessage('success', 'Berhasil', 'Data Berhasil Disimpan');
    };

    const redirectBack = () => {
        router.push('/registration');
    };

    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Batal" icon="pi pi-times" className="p-button-outlined p-button-secondary" onClick={redirectBack} />
            <Button label="Simpan" icon="pi pi-check" onClick={onSubmit} />
        </div>
    );
    return (
        <div className="fluid">
            <Toast ref={toast} />
            <Card title="Kunjungan Pasien" footer={footer}>
                <div className="grid">
                    <div className="col-12 md:col-4">
                        <div className="card">
                            <div className="flex justify-content-between flex-wrap">
                                <div className="flex align-items-center justify-content-center font-bold">
                                    <h5>Data Pribadi</h5>
                                </div>
                                <div className="flex align-items-center justify-content-center font-bold gap-2">
                                    <Button label={isAllowInputPatient ? 'Batal' : 'Ubah'} className="p-button-outlined p-button-secondary" onClick={() => setIsAllowInputPatient(!isAllowInputPatient)} />
                                    {!isAllowInputPatient && <Button label={isShowDetailPatient ? 'Sembunyikan' : 'Detail'} className="p-button-outlined p-button-secondary" onClick={() => setIsShowDetailPatient(!isShowDetailPatient)} />}
                                </div>
                            </div>
                            {!isAllowInputPatient && (
                                <div className="grid font-bold mt-2">
                                    <div className="col-12 md:col-4 text-right">NIK</div>
                                    <div className="col-12 md:col-8 text-left">{patient?.nik}</div>
                                    <div className="col-12 md:col-4 text-right">Nama</div>
                                    <div className="col-12 md:col-8 text-left">{patient?.name}</div>
                                    <div className="col-12 md:col-4 text-right">Tgl Lahir</div>
                                    <div className="col-12 md:col-8 text-left">{patient?.birthDate}</div>
                                    <div className="col-12 md:col-4 text-right">Jenis Kelamin</div>
                                    <div className="col-12 md:col-8 text-left">{patient?.gender}</div>
                                    <div className="col-12 md:col-4 text-right">No Handphone</div>
                                    <div className="col-12 md:col-8 text-left">{patient?.contactPrimaryId}</div>
                                    {isShowDetailPatient && (
                                        <>
                                            <div className="col-12 md:col-4 text-right">No KK</div>
                                            <div className="col-12 md:col-8 text-left">{patient?.KKNumber}</div>
                                            <div className="col-12 md:col-4 text-right">Nama KK</div>
                                            <div className="col-12 md:col-8 text-left">{patient?.KKName}</div>
                                            <div className="col-12 md:col-4 text-right">Tempat Lahir</div>
                                            <div className="col-12 md:col-8 text-left">{patient?.birthPlace}</div>
                                            <div className="col-12 md:col-4 text-right">Alamat KTP</div>
                                            <div className="col-12 md:col-8 text-left">{patient?.ktpAddress}</div>
                                            <div className="col-12 md:col-4 text-right">Alamat Domisili</div>
                                            <div className="col-12 md:col-8 text-left">{patient?.residenceAddress}</div>
                                        </>
                                    )}
                                </div>
                            )}
                            {isAllowInputPatient && (
                                <>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="nik" className="col-fixed w-9rem">
                                            NIK
                                        </label>
                                        <InputNumber id="nik" value={patient.nik} onChange={(e) => onPatientChange(e.value, 'nik')} required useGrouping={false} maxLength={16} />
                                    </div>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="name" className="col-fixed w-9rem">
                                            Nama
                                        </label>
                                        <InputText id="name" value={patient.name} onChange={(e) => onPatientChange(e.target.value, 'name')} required />
                                    </div>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="birthPlace" className="col-fixed w-9rem">
                                            Tempat Lahir
                                        </label>
                                        <Dropdown value={patient.birthPlace} onChange={(e) => onPatientChange(e.value, 'birthPlace')} options={listPolyclinic} optionLabel="display" optionValue="code" placeholder="Pilih Kabupaten" />
                                    </div>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="birthDate" className="col-fixed w-9rem">
                                            Tgl Lahir
                                        </label>
                                        <Calendar id="date" showIcon showButtonBar value={patient.birthDate} onChange={(e) => onPatientChange(e.value ?? null, 'date')} dateFormat="dd/mm/yy" />
                                    </div>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="birthPlace" className="col-fixed w-9rem">
                                            Jenis Kelamin
                                        </label>
                                        <Dropdown value={patient.gender} onChange={(e) => onPatientChange(e.value, 'gender')} options={ENUM.GENDER} optionLabel="display" optionValue="code" placeholder="Pilih Jenis Kelamin" />
                                    </div>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="telp" className="col-fixed w-9rem">
                                            Nama KK
                                        </label>
                                        <InputText id="telp" value={patient.KKName} onChange={(e) => onPatientChange(e.target.value, 'KKName')} />
                                    </div>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="telp" className="col-fixed w-9rem">
                                            No KK
                                        </label>
                                        <InputText id="telp" value={patient.KKNumber} onChange={(e) => onPatientChange(e.target.value, 'KKNumber')} />
                                    </div>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3 mt-2">
                                        <label htmlFor="nationality" className="col-fixed w-9rem">
                                            Kewarganegaraan
                                        </label>
                                        <div>
                                            {ENUM.NATIONALITY.map((item, index) => (
                                                <div className="field-radiobutton" key={index}>
                                                    <RadioButton inputId="nationality" name="nationality" value={true} onChange={() => onPatientChange(item.code, 'nationality')} checked={patient.nationality === item.code} />
                                                    <label htmlFor="nationality">{item.display}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {patient.nationality === 'WNI' && (
                                        <>
                                            <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                                <label htmlFor="ktpWilayah" className="col-fixed w-9rem">
                                                    Alamat KTP
                                                </label>
                                                <AutoComplete
                                                    placeholder="Cari Alamat KTP"
                                                    id="ktpWilayah"
                                                    dropdown
                                                    value={patient.ktpAddress}
                                                    onChange={(e) => onPatientChange(e.value, 'ktpWilayah')}
                                                    suggestions={autoFilteredValue}
                                                    completeMethod={searchWilayah}
                                                    field="name"
                                                />
                                            </div>
                                            <div className="flex align-items-center gap-2 mb-3">
                                                <label htmlFor="RT" className="col-fixed w-2rem">
                                                    RT
                                                </label>
                                                <InputText className="w-4rem" id="RT" value={patient.KKNumber} onChange={(e) => onPatientChange(e.target.value, 'KKNumber')} />
                                                <label htmlFor="RW" className="col-fixed w-2rem">
                                                    RW
                                                </label>
                                                <InputText className="w-4rem" id="RW" value={patient.KKNumber} onChange={(e) => onPatientChange(e.target.value, 'KKNumber')} />
                                                <label htmlFor="postalCode" className="col-fixed w-4rem">
                                                    Kode POS
                                                </label>
                                                <InputText className="w-6rem" id="postalCode" value={patient.KKNumber} onChange={(e) => onPatientChange(e.target.value, 'KKNumber')} />
                                            </div>
                                            <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                                <label htmlFor="isSameKTP" className="col-fixed w-9rem">
                                                    Alamat Domisili Sama Dengan KTP ?
                                                </label>{' '}
                                                <br />
                                                <InputSwitch id="isSameKTP" checked={isSameKTP} onChange={(e) => onSameKTP(e.value ?? false)} />
                                            </div>
                                        </>
                                    )}
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="domisiliWilayahId" className="col-fixed w-9rem">
                                            Alamat Domisili
                                        </label>
                                        <AutoComplete
                                            placeholder="Cari Alamat Domisi"
                                            id="domisiliWilayahId"
                                            dropdown
                                            value={patient.residenceAddress}
                                            onChange={(e) => onPatientChange(e.value, 'domisiliWilayah')}
                                            suggestions={autoFilteredValue}
                                            completeMethod={searchWilayah}
                                            field="name"
                                        />
                                    </div>
                                    <div className="flex align-items-center gap-2 mb-3">
                                        <label htmlFor="RT" className="col-fixed w-2rem">
                                            RT
                                        </label>
                                        <InputText className="w-4rem" id="RT" value={patient.KKNumber} onChange={(e) => onPatientChange(e.target.value, 'KKNumber')} />
                                        <label htmlFor="RW" className="col-fixed w-2rem">
                                            RW
                                        </label>
                                        <InputText className="w-4rem" id="RW" value={patient.KKNumber} onChange={(e) => onPatientChange(e.target.value, 'KKNumber')} />
                                        <label htmlFor="postalCode" className="col-fixed w-4rem">
                                            Kode POS
                                        </label>
                                        <InputText className="w-6rem" id="postalCode" value={patient.KKNumber} onChange={(e) => onPatientChange(e.target.value, 'KKNumber')} />
                                    </div>
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="religion" className="col-fixed w-9rem text-right">
                                            Agama
                                        </label>
                                        <Dropdown value={patient.religion} onChange={(e) => onPatientChange(e.value, 'religion')} options={ENUM.RELIGION} optionLabel="display" optionValue="code" placeholder="Pilih Agama" />

                                        <label htmlFor="bloodType" className="col-fixed w-9rem text-right">
                                            Golongan Darah
                                        </label>
                                        <Dropdown value={patient.bloodType} onChange={(e) => onPatientChange(e.value, 'bloodType')} options={ENUM.BLOOD_TYPE} optionLabel="display" optionValue="code" placeholder="Pilih Golongan" />

                                        <label htmlFor="occupation" className="col-fixed w-9rem text-right">
                                            Pekerjaan
                                        </label>
                                        <Dropdown value={patient.occupation} onChange={(e) => onPatientChange(e.value, 'occupation')} options={ENUM.JOB} optionLabel="display" optionValue="code" placeholder="Pilih Pekerjaan" />

                                        <label htmlFor="maritalStatus" className="col-fixed w-9rem text-right">
                                            Status
                                        </label>
                                        <Dropdown value={patient.maritalStatus} onChange={(e) => onPatientChange(e.value, 'maritalStatus')} options={ENUM.MARITAL_STATUS} optionLabel="display" optionValue="code" placeholder="Pilih Status" />

                                        <label htmlFor="isSameAddress" className="col-fixed w-9rem text-right">
                                            Pendidikan Terakhir
                                        </label>
                                        <Dropdown value={patient.lastDegree} onChange={(e) => onPatientChange(e.value, 'lastDegree')} options={ENUM.DEGREE} optionLabel="display" optionValue="code" placeholder="Pilih Pendidikan" />

                                        <label htmlFor="race" className="col-fixed w-9rem text-right">
                                            Ras Suku
                                        </label>
                                        <Dropdown value={patient.race} onChange={(e) => onPatientChange(e.value, 'race')} options={ENUM.RACE} optionLabel="display" optionValue="code" placeholder="Pilih Ras Suku" />

                                        <h5 className="w-full">Orang yang Dapat di Hubungi</h5>
                                        <label htmlFor="address" className="col-fixed w-9rem text-right">
                                            Nama
                                        </label>
                                        <InputText id="address" value={patient.name} onChange={(e) => onPatientChange(e.target.value, 'address')} />

                                        <label htmlFor="address" className="col-fixed w-9rem text-right">
                                            No HP
                                        </label>
                                        <InputText id="address" value={patient.name} onChange={(e) => onPatientChange(e.target.value, 'address')} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="card">
                            <h5>Kunjungan</h5>
                            <div className="font-bold">
                                <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                    <label htmlFor="date" className="col-fixed w-9rem text-right text-bold">
                                        Tanggal
                                    </label>
                                    <Calendar id="date" showIcon showButtonBar value={encounter.date} onChange={(e) => onValueChange(e.value ?? null, 'date')} dateFormat="dd/mm/yy" />
                                </div>
                                <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                    <label htmlFor="patientType" className="col-fixed w-9rem text-right text-bold">
                                        Jenis Pasien
                                    </label>
                                    <Dropdown
                                        id="patientType"
                                        value={encounter.patientType}
                                        onChange={(e) => onValueChange(e.value, 'patientType')}
                                        options={listPatientType}
                                        optionLabel="display"
                                        optionValue="code"
                                        placeholder="Pilih Jenis pasien"
                                    />
                                </div>
                                {encounter && encounter.patientType && encounter.patientType.payment && encounter.patientType.payment.length > 1 && (
                                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                        <label htmlFor="complaints" className="col-fixed w-9rem text-right text-bold">
                                            Pembayaran
                                        </label>
                                        <Dropdown value={encounter.payment} onChange={(e) => onValueChange(e.value, 'payment')} options={encounter?.patientType?.payment} optionLabel="display" optionValue="code" placeholder="Pilih Pembayaran" />
                                    </div>
                                )}
                                <div className="flex align-items-center flex-wrap gap-2 mb-3 mt-2">
                                    <label htmlFor="type" className="col-fixed w-9rem text-right text-bold">
                                        Jenis Kunjungan
                                    </label>
                                    <div>
                                        {listEncounterType.map((item, index) => (
                                            <div className="field-radiobutton" key={index}>
                                                <RadioButton inputId="type" name="type" value={true} onChange={() => onValueChange(item.code, 'type')} checked={encounter.type === item.code} />
                                                <label htmlFor="type">{item.display}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                    <label htmlFor="type" className="col-fixed w-9rem text-right text-bold">
                                        Poli Tujuan
                                    </label>
                                    <Dropdown value={encounter.polyclinic} onChange={(e) => onValueChange(e.value, 'polyclinic')} options={listPolyclinic} optionLabel="display" placeholder="Pilih Poli" />
                                </div>
                                <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                    <label htmlFor="type" className="col-fixed w-9rem text-right text-bold">
                                        Keluhan
                                    </label>
                                    <InputTextarea placeholder="Keluhan" rows={5} cols={25} value={encounter.complaints} onChange={(e) => onValueChange(e.target.value, 'complaints')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="card">
                            <h5>Pemeriksaan Fisik</h5>
                            <div className="grid font-bold">
                                <div className="col-12 md:col-6">
                                    <div className="field">
                                        <h6>Tinggi Badan</h6>
                                        <div className="p-inputgroup">
                                            <InputNumber placeholder="Tinggi Badan" value={encounter.physicalExamination?.height} onChange={(e) => onValueChange(e.value, 'height')} min={10} max={300} />
                                            <span className="p-inputgroup-addon">cm</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6">
                                    <div className="field">
                                        <h6>Berat Badan</h6>
                                        <div className="p-inputgroup">
                                            <InputNumber placeholder="Berat Badan" value={encounter.physicalExamination?.weight} onChange={(e) => onValueChange(e.value, 'weight')} min={5} max={500} />
                                            <span className="p-inputgroup-addon">kg</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6">
                                    <div className="field">
                                        <h6>Lingkar Perut</h6>
                                        <div className="p-inputgroup">
                                            <InputNumber placeholder="Lingkar Perut" value={encounter.physicalExamination?.abdominalCircumference} onChange={(e) => onValueChange(e.value, 'abdominalCircumference')} min={0} max={300} />
                                            <span className="p-inputgroup-addon">cm</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6">
                                    <div className="field">
                                        <h6>IMT</h6>
                                        <div className="p-inputgroup">
                                            <InputNumber placeholder="IMT" value={encounter.physicalExamination?.BMI} onChange={(e) => onValueChange(e.value, 'BMI')} min={0} max={100} />
                                            <span className="p-inputgroup-addon">kg/mm2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h5>Tekanan Darah</h5>
                            <div className="grid font-bold">
                                <div className="col-12 md:col-6">
                                    <div className="field">
                                        <h6>Sistole</h6>
                                        <div className="p-inputgroup">
                                            <InputNumber placeholder="Sistole" value={encounter.bloodPressure?.systolic} onChange={(e) => onValueChange(e.value, 'systolic')} min={0} max={300} />
                                            <span className="p-inputgroup-addon">mmHg</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6">
                                    <div className="field">
                                        <h6>Diastole</h6>
                                        <div className="p-inputgroup">
                                            <InputNumber placeholder="Diastole" value={encounter.bloodPressure?.diastolic} onChange={(e) => onValueChange(e.value, 'diastolic')} min={0} max={300} />
                                            <span className="p-inputgroup-addon">mmHg</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6">
                                    <div className="field">
                                        <label htmlFor="respiratoryRate">Respiratory Rate</label>
                                        <div className="p-inputgroup">
                                            <InputNumber placeholder="Respiratory Rate" value={encounter.bloodPressure?.respiratoryRate} onChange={(e) => onValueChange(e.value, 'respiratoryRate')} min={0} max={300} />
                                            <span className="p-inputgroup-addon">/ menit</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 md:col-6">
                                    <div className="field">
                                        <h6>Heart Rate</h6>
                                        <div className="p-inputgroup">
                                            <InputNumber placeholder="Heart Rate" value={encounter.bloodPressure?.hearthRate} onChange={(e) => onValueChange(e.value, 'hearthRate')} min={0} max={300} />
                                            <span className="p-inputgroup-addon">bpm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default KunjunganPage;

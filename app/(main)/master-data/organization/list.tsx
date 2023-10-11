import { Organization } from '../../../types/organization';

const ListPage = (props: any) => {
    const org: Organization = props.organization;
    return (
        <div className="grid">
            <div className="col-6">
                <div className="card">
                    <ul className="list-none p-0 m-0">
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Nama :</span>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <span className="text-900 ml-3 font-medium">{org.name}</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Status :</span>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <span className="text-900 ml-3 font-medium">{org.active}</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Kontak :</span>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <span className="text-900 ml-3 font-medium">{}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-6">
                <div className="card">
                    <ul className="list-none p-0 m-0">
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Provinsi :</span>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <span className="text-900 ml-3 font-medium">{org.address?.province.display}</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Kab/Kota :</span>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <span className="text-900 ml-3 font-medium">{org.address?.city.display}</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Kecamatan :</span>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <span className="text-900 ml-3 font-medium">{org.address?.district.display}</span>
                            </div>
                        </li>
                        <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                            <div>
                                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">Kelurahan :</span>
                            </div>
                            <div className="mt-2 md:mt-0 flex align-items-center">
                                <span className="text-900 ml-3 font-medium">{org.address?.village.display}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ListPage;

import Banner from '@/components/Banner';
import DataStatsSection from '@/components/DataStatsSection';
import TopDoctors from '@/components/DoctorsSection';
import PrescriptionProcessSection from '@/components/PrescriptionProcessSection';

import React from 'react';

const page = () => {
    return (
        <div>
            <Banner></Banner>
           <TopDoctors></TopDoctors>
           <DataStatsSection></DataStatsSection>
           <PrescriptionProcessSection></PrescriptionProcessSection>
        </div>
    );
};

export default page;
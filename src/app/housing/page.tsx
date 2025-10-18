'use client';

import { Suspense } from 'react';
import GridPage from '@/pages/GridPage';

function HousingContent() {
  return <GridPage />;
}

export default function HousingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HousingContent />
    </Suspense>
  );
}

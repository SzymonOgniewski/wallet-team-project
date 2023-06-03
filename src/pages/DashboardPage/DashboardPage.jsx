import React from 'react';
import HomeTab from 'components/HomeTab/HomeTab'
import { ButtonAddTransactions } from 'components/ButtonAddTransactions/ButtonAddTransactions';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';

export function DashboardPage() {
  return (
    <DashboardLayout>
      <HomeTab />
      <ButtonAddTransactions />
    </DashboardLayout>
  );
}
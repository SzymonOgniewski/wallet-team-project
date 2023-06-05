import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomeTab from 'components/HomeTab/HomeTab';
import { ButtonAddTransactions } from 'components/ButtonAddTransactions/ButtonAddTransactions';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import { fetchBalance } from 'redux/finance/financeThunk';
import { fetchTransactions } from 'redux/transactions/transactionThunk';

export function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <HomeTab />
      <ButtonAddTransactions />
    </DashboardLayout>
  );
}

export const getTransactions = state => state.transactions.items;
export const getIsLoading = state => state.transactions.isLoading;
export const getError = state => state.transactions.error;

export const getTransactionsSummary = state => state.transactions.summary;
export const getDetailsIncome = state => state.transactions.incomeSummary;
export const getDetailsExpense = state => state.transactions.expenseSummary;

export const getCategories = state => state.transactions.categories;

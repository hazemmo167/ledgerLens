export const kpiData = [
  {
    title: "Total Liquidity",
    amount: 142500.0,
    change: "+12.5%",
    trend: "up",
    icon: "Wallet",
  },
  {
    title: "Monthly Burn Rate",
    amount: 18200.0,
    change: "-4.2%",
    trend: "down",
    isExpense: true,
    icon: "Flame",
  },
  {
    title: "Net Working Capital",
    amount: 85300.0,
    change: "+8.1%",
    trend: "up",
    icon: "Briefcase",
  },
];

export const chartData = [
  { name: "Jan", Income: 40000, Expense: 24000 },
  { name: "Feb", Income: 30000, Expense: 13980 },
  { name: "Mar", Income: 20000, Expense: 58000 },
  { name: "Apr", Income: 27800, Expense: 39080 },
  { name: "May", Income: 18900, Expense: 48000 },
  { name: "Jun", Income: 23900, Expense: 38000 },
  { name: "Jul", Income: 34900, Expense: 43000 },
];

export const recentTransactions = [
  {
    id: 1,
    date: "2023-10-24",
    merchant: "Stripe Payout",
    category: "Revenue",
    amount: 12500.0,
    type: "credit",
    status: "Cleared",
  },
  {
    id: 2,
    date: "2023-10-23",
    merchant: "AWS Web Services",
    category: "Infrastructure",
    amount: 2450.5,
    type: "debit",
    status: "Pending",
  },
  {
    id: 3,
    date: "2023-10-22",
    merchant: "Gusto Payroll",
    category: "Payroll",
    amount: 8400.0,
    type: "debit",
    status: "Cleared",
  },
  {
    id: 4,
    date: "2023-10-21",
    merchant: "WeWork Rent",
    category: "Office",
    amount: 4500.0,
    type: "debit",
    status: "Cleared",
  },
  {
    id: 5,
    date: "2023-10-20",
    merchant: "Client Invoice #004",
    category: "Accounts Receivable",
    amount: 3200.0,
    type: "credit",
    status: "Cleared",
  },
];

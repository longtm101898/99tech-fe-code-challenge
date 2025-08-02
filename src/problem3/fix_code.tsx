import React, { useMemo, useCallback } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing blockchain property
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
  blockchain: string;
}

// Define valid blockchain types for type safety
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

interface Props extends BoxProps {
  children?: React.ReactNode; // Added optional children
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Memoized priority function with proper typing
  const getPriority = useCallback((blockchain: Blockchain): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  }, []);

  // Fixed filtering and sorting logic
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain as Blockchain);
        return balancePriority > -99 && balance.amount > 0; // Fixed logic: keep positive balances
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain as Blockchain);
        const rightPriority = getPriority(rhs.blockchain as Blockchain);

        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        return 0; // Added missing return for equal priorities
      });
  }, [balances, getPriority]); // Removed unused 'prices' dependency

  // Combined formatting and rendering for efficiency
  const rows = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      const formattedAmount = balance.amount.toFixed();
      const price = prices[balance.currency] || 0; // Added safety check
      const usdValue = price * balance.amount;

      return (
        <WalletRow
          className={classes.row}
          key={`${balance.blockchain}-${balance.currency}`} // Better unique key
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={formattedAmount}
        />
      );
    });
  }, [sortedBalances, prices, classes.row]);

  return (
    <div {...rest}>
      {children} {/* Added children rendering */}
      {rows}
    </div>
  );
};

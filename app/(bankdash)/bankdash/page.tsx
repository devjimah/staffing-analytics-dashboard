import { MyCards } from "@/components/bankdash/MyCards"
import { RecentTransactions } from "@/components/bankdash/RecentTransactions"
import { WeeklyActivity } from "@/components/bankdash/WeeklyActivity"
import { ExpenseStatistics } from "@/components/bankdash/ExpenseStatistics"
import { QuickTransfer } from "@/components/bankdash/QuickTransfer"
import { BalanceHistory } from "@/components/bankdash/BalanceHistory"

export default function BankDashPage() {
  return (
    <div className="flex flex-col gap-8 max-w-[1190px]">
      {/* Row 1: My Cards + Recent Transactions */}
      <div className="flex gap-[30px]">
        <div className="flex-1 min-w-0">
          <MyCards />
        </div>
        <div className="w-[350px] shrink-0">
          <RecentTransactions />
        </div>
      </div>

      {/* Row 2: Weekly Activity + Expense Statistics */}
      <div className="flex gap-[30px]">
        <div className="flex-1 min-w-0">
          <WeeklyActivity />
        </div>
        <div className="w-[350px] shrink-0">
          <ExpenseStatistics />
        </div>
      </div>

      {/* Row 3: Quick Transfer + Balance History */}
      <div className="flex gap-[30px]">
        <div className="w-[445px] shrink-0">
          <QuickTransfer />
        </div>
        <div className="flex-1 min-w-0">
          <BalanceHistory />
        </div>
      </div>
    </div>
  )
}

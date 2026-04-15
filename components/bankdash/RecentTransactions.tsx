const paypalCircle = "https://www.figma.com/api/mcp/asset/b37c7051-a7f3-4fa0-84c0-8b4246ee4241"
const cardCircle = "https://www.figma.com/api/mcp/asset/47a87dfd-b8f5-4112-986a-5c10c3fa4a14"
const transferCircle = "https://www.figma.com/api/mcp/asset/73e92343-81f2-42c3-b020-e57226d1d22f"
const paypalLogo = "https://www.figma.com/api/mcp/asset/83ddb49f-9762-4897-a1ed-02d870125034"
const moneyIcon = "https://www.figma.com/api/mcp/asset/cf8729e1-cc53-4db9-ab1a-88435f93473c"
const personIcon = "https://www.figma.com/api/mcp/asset/c1025d38-2924-44f2-9015-61404337b33f"

const transactions = [
  {
    id: 1,
    name: "Deposit from my Card",
    date: "28 January 2021",
    amount: "-$850",
    positive: false,
    circleUrl: cardCircle,
    iconUrl: moneyIcon,
  },
  {
    id: 2,
    name: "Deposit Paypal",
    date: "25 January 2021",
    amount: "+$2,500",
    positive: true,
    circleUrl: paypalCircle,
    iconUrl: paypalLogo,
  },
  {
    id: 3,
    name: "Jemi Wilson",
    date: "21 January 2021",
    amount: "+$5,400",
    positive: true,
    circleUrl: transferCircle,
    iconUrl: personIcon,
  },
]

export function RecentTransactions() {
  return (
    <section>
      <h2 className="text-[#343c6a] text-[22px] font-semibold mb-5">Recent Transaction</h2>
      <div className="bg-white rounded-[25px] h-[235px] flex flex-col justify-center px-6 gap-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center gap-4 py-3">
            {/* Icon */}
            <div className="relative w-[55px] h-[55px] shrink-0">
              <img src={tx.circleUrl} alt="" className="w-full h-full object-cover" />
              <img
                src={tx.iconUrl}
                alt={tx.name}
                className="absolute inset-0 m-auto w-7 h-7 object-contain"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-[#232323] text-[16px] font-medium truncate">{tx.name}</p>
              <p className="text-[#718ebf] text-[15px]">{tx.date}</p>
            </div>

            {/* Amount */}
            <p
              className={`text-[16px] font-medium shrink-0 ${
                tx.positive ? "text-[#41d4a8]" : "text-[#ff4b4a]"
              }`}
            >
              {tx.amount}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

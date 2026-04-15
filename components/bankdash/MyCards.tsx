const chipCard = "https://www.figma.com/api/mcp/asset/24e093ce-dd28-4e2b-96ff-a354dbc2dc01"
const mastercardDark = "https://www.figma.com/api/mcp/asset/a04b5aae-b2ea-49c3-924f-268cbf5130b0"
const mastercardLight = "https://www.figma.com/api/mcp/asset/42c88b48-502f-4e79-89b8-3cc19cfa134d"

interface CardProps {
  balance: string
  holder: string
  validThru: string
  cardNumber: string
  variant: "dark" | "light"
}

function CreditCard({ balance, holder, validThru, cardNumber, variant }: CardProps) {
  const isDark = variant === "dark"

  return (
    <div
      className="flex-1 min-w-[260px] h-[235px] rounded-[25px] flex flex-col justify-between overflow-hidden"
      style={
        isDark
          ? { background: "linear-gradient(114.99deg, #4C49ED 2.61%, #0A06F4 101.2%)" }
          : { background: "white", border: "1px solid #dfeaf2" }
      }
    >
      {/* Top section */}
      <div className="flex items-start justify-between px-7 pt-6">
        <div>
          <p className={`text-[12px] ${isDark ? "text-white/70" : "text-[#718ebf]"}`}>
            Balance
          </p>
          <p className={`text-[20px] font-semibold mt-1 ${isDark ? "text-white" : "text-[#343c6a]"}`}>
            {balance}
          </p>
        </div>
        <img src={chipCard} alt="chip" className="w-[35px] h-[35px] object-cover mt-1" />
      </div>

      {/* Middle section — card holder & valid thru */}
      <div className="flex gap-10 px-7">
        <div>
          <p className={`text-[12px] ${isDark ? "text-white/70" : "text-[#718ebf]"}`}>
            CARD HOLDER
          </p>
          <p className={`text-[15px] font-semibold mt-1 ${isDark ? "text-white" : "text-[#343c6a]"}`}>
            {holder}
          </p>
        </div>
        <div>
          <p className={`text-[12px] ${isDark ? "text-white/70" : "text-[#718ebf]"}`}>
            VALID THRU
          </p>
          <p className={`text-[15px] font-semibold mt-1 ${isDark ? "text-white" : "text-[#343c6a]"}`}>
            {validThru}
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="flex items-center justify-between px-7 h-[70px] rounded-b-[25px]"
        style={
          isDark
            ? { background: "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0))" }
            : { borderTop: "1px solid #dfeaf2" }
        }
      >
        <p className={`text-[22px] font-semibold tracking-wider ${isDark ? "text-white" : "text-[#343c6a]"}`}>
          {cardNumber}
        </p>
        <img
          src={isDark ? mastercardDark : mastercardLight}
          alt="mastercard"
          className="w-[44px] h-[30px] object-contain"
        />
      </div>
    </div>
  )
}

export function MyCards() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[#343c6a] text-[22px] font-semibold">My Cards</h2>
        <span className="text-[#343c6a] text-[17px] font-semibold cursor-pointer hover:underline">
          See All
        </span>
      </div>
      <div className="flex gap-5 flex-wrap">
        <CreditCard
          balance="$5,756"
          holder="Eddy Cusuma"
          validThru="12/22"
          cardNumber="3778 **** **** 1234"
          variant="dark"
        />
        <CreditCard
          balance="$5,756"
          holder="Eddy Cusuma"
          validThru="12/22"
          cardNumber="3778 **** **** 1234"
          variant="light"
        />
      </div>
    </section>
  )
}
